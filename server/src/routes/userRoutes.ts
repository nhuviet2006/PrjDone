// File: src/routes/userRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { upload } from "../middlewares/upload.middleware";
import * as adminController from '../controllers/adminController';
import * as userController from '../controllers/user.controller'; // (Nếu bạn có file này)

const router = Router();

// ================== KHU VỰC SỰ KIỆN (ADMIN) ==================

// 1. Thêm sự kiện (Có upload ảnh)
// Frontend gọi: POST /api/admin/events
router.post(
  "/events", 
  authenticateToken, 
  upload.single("image"), // Middleware xử lý ảnh
  adminController.createEvent
);

// 2. Lấy danh sách sự kiện của tôi
// Frontend gọi: GET /api/admin/my-events
router.get("/my-events", authenticateToken, adminController.getMyEvents);

// 3. Xóa sự kiện
// Frontend gọi: DELETE /api/admin/events/:id
router.delete("/events/:id", authenticateToken, adminController.deleteEvent);


// ================== KHU VỰC QUẢN LÝ USER ==================

// 4. Cấp quyền Admin (Khớp với admin.js gọi /grant-admin)
router.post("/grant-admin", authenticateToken, adminController.grantAdmin);

// (Giữ lại các route cũ của bạn nếu cần dùng ở chỗ khác)
router.post('/promote-admin', authenticateToken, userController.promoteUser);
router.post('/revoke-admin', authenticateToken, userController.revokeAdmin);

export default router;