import { Router } from 'express';
import { createEvent, getEvents, buyTicket, getMyTickets, updateEvent, deleteEvent } from '../controllers/eventController';
import { authenticateToken } from '../middlewares/auth.middleware';
import { authorizeAdmin } from '../middlewares/roleMiddleware';

const router = Router();
const uploadCloud = require('../config/cloudinary.config');
router.post('/create-event', uploadCloud.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Không có file nào được upload!');
  }
  const imageUrl = req.file.path; 

  res.json({ message: 'Upload thành công', imageUrl: imageUrl });
});
// 1. User xem danh sách (Công khai)
router.get('/', getEvents);

// 2. User xem vé của mình (Cần đăng nhập)
router.get('/my-tickets', authenticateToken, getMyTickets);

// 3. User mua vé (Cần đăng nhập)
router.post('/:id/register', authenticateToken, buyTicket);

// --- KHU VỰC ADMIN ---
// 4. Tạo sự kiện
router.post('/', authenticateToken, authorizeAdmin, createEvent);

// 5. Sửa sự kiện (PUT)
router.put('/:id', authenticateToken, authorizeAdmin, updateEvent);

// 6. Xóa sự kiện (DELETE)
router.delete('/:id', authenticateToken, authorizeAdmin, deleteEvent);

export default router;