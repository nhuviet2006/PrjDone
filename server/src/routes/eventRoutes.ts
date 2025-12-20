import { Router } from 'express';
import { createEvent, getEvents, buyTicket, getMyTickets, updateEvent, deleteEvent } from '../controllers/eventController';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeAdmin } from '../middlewares/roleMiddleware';

const router = Router();

// 1. User xem danh sách (Công khai)
router.get('/', getEvents);

// 2. User xem vé của mình (Cần đăng nhập)
router.get('/my-tickets', authenticate, getMyTickets);

// 3. User mua vé (Cần đăng nhập)
router.post('/:id/register', authenticate, buyTicket);

// --- KHU VỰC ADMIN ---
// 4. Tạo sự kiện
router.post('/', authenticate, authorizeAdmin, createEvent);

// 5. Sửa sự kiện (PUT)
router.put('/:id', authenticate, authorizeAdmin, updateEvent);

// 6. Xóa sự kiện (DELETE)
router.delete('/:id', authenticate, authorizeAdmin, deleteEvent);

export default router;