/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/index'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import cookieParser from 'cookie-parser'
//Xử lí socket real-time với socket.io
//socket.io/get-started/chat/#integrating-socketio
import socketIo from 'socket.io'
import http from 'http'
import { inviteUserToCourseSocket } from '~/sockets/inviteUserToCourseSocket'

const START_SERVER = () => {
  const app = express()
  //Fix Cache from disk của ExpressJS
  //https://stackoverflow.com/a/53240717/8324172
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  //Cấu hình Cookie Parser
  app.use(cookieParser())

  //Xử lý CORS
  app.use(cors(corsOptions))

  //enable req.body json data
  app.use(express.json())

  // Sử dụng middleware express.urlencoded để phân tích dữ liệu từ form
  app.use(express.urlencoded({ extended: true }))

  // //Use API V1
  app.use('/v1', APIs_V1)
  // app.use('/firebase', APIs_fbase)

  // //Middlewares xử lý lỗi tập chung
  app.use(errorHandlingMiddleware)

  /**
   * Tạo server mới bọc app của express để làm real-time với socket.io
   */
  const server = http.createServer(app)
  //Khởi tạo biến io với server và cors
  const io = socketIo(server, { cors: corsOptions })
  io.on('connection', (socket) => {
    console.log('A user connected!')
    inviteUserToCourseSocket(socket)
  })

  //Dùng server.listen thay vì app.listen vì lúc này server đã bao gồm app và config socket.io
  server.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, Back-end Server is running successfully at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  //Thực hiện các tác vụ trước khi dừng server
  exitHook(() => {
    console.log('Server is shutting down...')
    CLOSE_DB()
    console.log('Disconnected from MongoDB Cloud Atlas')
  })
}

//Chỉ khi kết nối thành công đến Database thì mới Start Server Back-end lên
//Immidiately-invoked / Anonymous Async Functions (IIFE)
(async () => {
  try {
    console.log('Conecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('Conected to MongoDB Cloud Atlas!')

    //Khởi đôngj server Back-end sau khi Connect Database thành công
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
