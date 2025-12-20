import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'sieubaomat';

// Định nghĩa kiểu dữ liệu để các file khác có thể dùng lại
export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Lấy token từ header (Bearer token...)
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Lưu thông tin user vào request
    next(); // Cho phép đi tiếp
  } catch (err) {
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};