import { Response, NextFunction } from 'express';
import { prisma } from '../utils/db';
import { AuthRequest } from './auth.middleware';

export const authorizeAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Phiên đăng nhập không hợp lệ!" });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { role: true }
    });

    if (user && user.role.toLowerCase() === 'admin') {
      next(); 
    } else {
      return res.status(403).json({ message: "Lỗi: Chỉ Admin mới được quyền này!" });
    }
  } catch (error) {
    console.error("Lỗi xác thực Admin:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi kiểm tra quyền" });
  }
};