import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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