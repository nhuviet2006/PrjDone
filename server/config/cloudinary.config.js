const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình Cloudinary lấy từ file .env
cloudinary.config({
  cloud_name: 'dzrbufc9b',
  api_key: '853777225781396',
  api_secret: 'Y6iYSgGx2QX388nKjwKzMrdTZIg'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'evento-uploads', // Tên thư mục bạn muốn tạo trên Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;