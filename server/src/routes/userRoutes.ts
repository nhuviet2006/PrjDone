// File: src/routes/userRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { upload } from "../middlewares/upload.middleware";
import * as adminController from '../controllers/adminController';
import * as userController from '../controllers/user.controller'; 

const router = Router();

// ================== KHU VỰC SỰ KIỆN (ADMIN) ==================

// 1. Thêm sự kiện (Có upload ảnh)
router.post(
  "/events", 
  authenticateToken, 
  upload.single("image"), 
  adminController.createEvent
);

// 2. Lấy danh sách sự kiện của tôi
router.get("/my-events", authenticateToken, adminController.getMyEvents);

// 3. Xóa sự kiện
router.delete("/events/:id", authenticateToken, adminController.deleteEvent);


// ================== KHU VỰC QUẢN LÝ USER ==================

// 4. Cấp quyền Admin
router.post("/grant-admin", authenticateToken, adminController.grantAdmin);

router.post('/promote-admin', authenticateToken, userController.promoteUser);
router.post('/revoke-admin', authenticateToken, userController.revokeAdmin);

export default router;