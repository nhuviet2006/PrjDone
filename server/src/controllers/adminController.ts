import { Request, Response } from "express";
import { prisma } from "../utils/db";
import { AuthRequest } from "../middlewares/auth.middleware";

// 1. LẤY DANH SÁCH SỰ KIỆN CỦA TÔI
export const getMyEvents = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId; 
    
    if(!userId) return res.sendStatus(403); 

    const events = await prisma.event.findMany({
      where: { 
        userId: Number(userId) 
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(events);
  } catch (error) {
    console.error("Lỗi getMyEvents:", error);
    res.status(500).json({ message: "Lỗi Server tải danh sách" });
  }
};

// 2. XÓA SỰ KIỆN
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const eventId = parseInt(req.params.id);

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    
    if (!event || event.userId !== userId) {
      return res.status(403).json({ message: "Bạn không có quyền xóa sự kiện này" });
    }

    await prisma.event.delete({ where: { id: eventId } });
    res.json({ message: "Đã xóa sự kiện!" });
  } catch (error) {
    console.error("Lỗi delete:", error);
    res.status(500).json({ message: "Lỗi khi xóa" });
  }
};

// 3. THÊM SỰ KIỆN MỚI
export const createEvent = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
        return res.status(403).json({ message: "Chưa đăng nhập hoặc Token lỗi!" });
    }

    const { title, date, month, time, location, speaker, description, totalTickets, price } = req.body;
    
    let imageUrl = "";
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    } else {
        imageUrl = "https://via.placeholder.com/300"; 
    }

    if (!price || !totalTickets) {
        return res.status(400).json({ message: "Thiếu giá vé hoặc số lượng!" });
    }

    const newEvent = await prisma.event.create({
      data: {
        title, date, month, time, location, speaker, description,
        image: imageUrl,
        totalTickets: Number(totalTickets), 
        price: Number(price),
        
        createdBy: { connect: { id: Number(userId) } } 
      }
    });

    res.status(201).json({ message: "Thêm sự kiện thành công!", data: newEvent });

  } catch (error) {
    console.error("Lỗi createEvent:", error);
    res.status(500).json({ message: "Lỗi Server khi tạo sự kiện" });
  }
};

// 4. CẤP QUYỀN ADMIN
export const grantAdmin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "Không tìm thấy Email này" });

    // Cập nhật Database
    await prisma.user.update({
      where: { email },
      data: { role: 'admin' }
    });

    res.json({ message: `Đã cấp quyền Admin cho ${email} thành công!` });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server" });
  }
};