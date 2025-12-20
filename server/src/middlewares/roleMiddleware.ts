import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware'; // Import từ file auth bên trên

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Kiểm tra xem user có tồn tại và role có phải ADMIN không
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Chỉ Admin mới được quyền này!' });
  }
  next(); // Cho phép đi tiếp
};