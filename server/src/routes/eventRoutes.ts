import { Router } from 'express';
import * as eventController from '../controllers/eventController';
import { createEvent, getEvents, buyTicket, getMyTickets, updateEvent, deleteEvent } from '../controllers/eventController';
import { authenticateToken } from '../middlewares/auth.middleware';
import { authorizeAdmin } from '../middlewares/roleMiddleware';
import uploadCloud from '../config/cloudinary.config';
const router = Router();

// 1. User xem danh sách (Công khai)
router.get('/', getEvents);

// 2. User xem vé của mình (Cần đăng nhập)
router.get('/my-tickets', authenticateToken, getMyTickets);

// 3. User mua vé (Cần đăng nhập)
router.post('/:id/register', authenticateToken, buyTicket);

// --- KHU VỰC ADMIN ---
// 4. Tạo sự kiện
router.post(
  '/create-event', 
  authenticateToken, 
  authorizeAdmin, 
  uploadCloud.single('image'),
  eventController.createEvent
);
router.get(
  '/my-events', 
  authenticateToken, 
  authorizeAdmin, 
  eventController.getMyCreatedEvents
);
// 5. Sửa sự kiện (PUT)
router.put(
  '/:id', 
  authenticateToken, 
  authorizeAdmin, 
  uploadCloud.single('image'), 
  eventController.updateEvent
);
// 6. Xóa sự kiện (DELETE)
router.delete('/:id', authenticateToken, authorizeAdmin, deleteEvent);

export default router;