import { Response, NextFunction } from 'express';
import { prisma } from '../utils/db'; // Đảm bảo đường dẫn tới file prisma db của bạn đúng
import { AuthRequest } from './auth.middleware';

export const authorizeAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // 1. Lấy userId đã được authenticateToken giải mã trước đó
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Phiên đăng nhập không hợp lệ!" });
    }

    // 2. TRUY VẤN THỜI GIAN THỰC: Soi thẳng vào DB để lấy Role mới nhất
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { role: true }
    });

    // 3. Kiểm tra quyền (chấp nhận cả 'admin' và 'ADMIN')
    if (user && user.role.toLowerCase() === 'admin') {
      next(); // DB xác nhận là admin -> Cho phép thực hiện hành động ngay
    } else {
      // Nếu DB vẫn báo là 'user' (hoặc role khác) -> Chặn lại
      return res.status(403).json({ message: "Lỗi: Chỉ Admin mới được quyền này!" });
    }
  } catch (error) {
    console.error("Lỗi xác thực Admin:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi kiểm tra quyền" });
  }
};