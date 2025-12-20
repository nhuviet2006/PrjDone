import { Request, Response } from 'express';
// Import toàn bộ hàm từ service
import * as eventService from '../services/eventService'; 
// Import giao diện AuthRequest để lấy được thông tin user
import { AuthRequest } from '../middlewares/auth.middleware';

// 1. Xem danh sách
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách sự kiện' });
  }
};

// 2. Tạo sự kiện (Admin)
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json({ message: 'Tạo sự kiện thành công!', data: event });
  } catch (error) {
    console.log(error); // Log lỗi ra terminal để dễ sửa
    res.status(500).json({ message: 'Lỗi tạo sự kiện' });
  }
};

// 3. Mua vé (User)
export const buyTicket = async (req: AuthRequest, res: Response) => {
  try {
    // Lấy ID user từ token (do middleware auth thêm vào)
    const userId = req.user.userId; 
    // Lấy ID sự kiện từ đường dẫn URL (ví dụ: /events/1/register -> id = 1)
    const eventId = parseInt(req.params.id);

    if (!userId || !eventId) {
      return res.status(400).json({ message: 'Thiếu thông tin User hoặc Event' });
    }

    const ticket = await eventService.registerEvent(userId, eventId);
    res.status(201).json({ message: 'Đăng ký vé thành công!', data: ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Lỗi đăng ký vé (Có thể bạn đã mua rồi hoặc sự kiện không tồn tại)' });
  }
};

// 4. Xem vé của tôi
export const getMyTickets = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    const tickets = await eventService.getTicketsByUserId(userId);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách vé' });
  }
};


// 5. API Sửa sự kiện
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);
    const updatedEvent = await eventService.updateEvent(eventId, req.body);
    res.json({ message: 'Cập nhật thành công!', data: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật (Có thể ID không tồn tại)' });
  }
};

// 6. API Xóa sự kiện
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);
    await eventService.deleteEvent(eventId);
    res.json({ message: 'Xóa sự kiện thành công!' });
  } catch (error) {
    // Lỗi thường gặp: Không xóa được vì đã có người mua vé (Ràng buộc khóa ngoại)
    res.status(500).json({ message: 'Lỗi khi xóa sự kiện' });
  }
};