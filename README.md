# Trello-api: Dự án thiết kế back-end cho hệ thống học tập và làm việc
***
## Mô tả dự án
> Dự án thiết kế cho môi trường học tập và có thể tạo một không gian làm việc nhóm. Cung cấp các tính năng sau:
- CRUD: Thao tác với database 
- CORS: Chặn và cho phép domain có quyền truy cập trang web
- Gửi email: Khi tài khoản mới được đăng kí server sẽ gửi về email để kích hoạt
- JWT: Xác thực người dùng khi đăng vào hệ thống
- Upload file: Cập nhật avatar hay ảnh bìa các khóa học
- Mời và xóa người dùng: Thêm hoặc xóa người dùng khác vào khóa học
- Tìm kiếm khóa học
- Gửi thông báo: Tính năng real-time socket.io để thông báo cho người dùng (đang phát triển)
***
## Minh họa database
![DataTrello](https://github.com/DucPham0312/Trello_api_2810/blob/master/DataTrelloV1.png)
***
## Công nghệ sử dụng
- **JavaScript, Node.js, Express.js**
- **RESTful API**.
- **MongoDB**: Cơ sở dữ liệu NoSQL.
- **JWT**: Xác thực và ủy quyền bảo mật.
- **GitHub**: Quản lý mã nguồn.
- **Brevo**: Gửi email tự động.
- **Cloudinary**: Lưu trữ và xử lý tệp tin, hình ảnh.
- **Socket.IO**: Real-time communication.
- **Postman**: Kiểm thử API.
***
## Chạy dự án
> Môi trường development: **npm run dev**

> Môi trường production: **npm run production**
