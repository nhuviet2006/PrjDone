import { Request, Response } from 'express';
import * as eventService from '../services/eventService'; 
import { AuthRequest } from '../middlewares/auth.middleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Xem danh sách
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: 'desc' 
      }
    });
    
    res.status(200).json(events);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Lỗi lấy danh sách sự kiện' });
  }
};

// 2. Tạo sự kiện (Admin) 
export const createEvent = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user?.userId;

    if (!userId) {
      return res.status(403).json({ message: "Bạn chưa đăng nhập!" });
    }

    // Lấy dữ liệu Text + Ảnh ---
    const eventData = { ...req.body };

    // Kiểm tra xem có file ảnh được upload không
    if (req.file) {
        eventData.image = req.file.path; // Lấy link ảnh từ Cloudinary
    } else {
        return res.status(400).json({ message: "Vui lòng tải ảnh poster sự kiện!" });
    }

    const newEvent = await eventService.createEvent(eventData, userId);
    res.status(201).json({ message: "Thêm sự kiện thành công!", data: newEvent });

  } catch (error) {
    console.error("Lỗi tạo sự kiện:", error);
    res.status(500).json({ message: "Lỗi Server khi tạo sự kiện" });
  }
};

// 3. Mua vé (User)
export const buyTicket = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId; 
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
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(403).json({ message: "Không tìm thấy thông tin người dùng" });
        }
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
    
    // Lấy data mới
    const updateData = { ...req.body };

    if (req.file) {
        updateData.image = req.file.path;
    }

    const updatedEvent = await eventService.updateEvent(eventId, updateData);
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
    res.status(500).json({ message: 'Lỗi khi xóa sự kiện' });
  }
};

// 7. API Lấy sự kiện của tôi (Admin)
export const getMyCreatedEvents = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId; 

    if (!userId) {
      return res.status(403).json({ message: "Chưa đăng nhập hoặc token không hợp lệ" });
    }

    const events = await eventService.getEventsByCreator(userId);
    res.json(events); 
  } catch (error) {
    console.error("Lỗi lấy sự kiện của tôi:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};