import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from "../utils/db";

const SECRET_KEY = process.env.JWT_SECRET || 'sieubaomat';

export interface UserPayload {
  userId: number;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;
    
    (req as AuthRequest).user = decoded; 
    
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};
// Trong file auth.middleware.ts
export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as AuthRequest).user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Không xác định được người dùng!" });
    }

    // Soi thẳng vào DB để lấy quyền mới nhất
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { role: true }
    });

    if (user && user.role.toLowerCase() === 'admin') {
      next(); // DB bảo là Admin thì cho qua
    } else {
      return res.status(403).json({ message: "Lỗi: Chỉ Admin mới được quyền này!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi xác thực quyền Admin" });
  }
};
