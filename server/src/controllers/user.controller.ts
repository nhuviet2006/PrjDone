import { Request, Response } from 'express';
// Import từ file service
import * as userService from '../services/user.service'; 

export const promoteUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body; 

    if (!email) {
      return res.status(400).json({ message: 'Vui lòng nhập email người cần cấp quyền!' });
    }

    await userService.promoteToAdmin(email);
    res.json({ message: `Đã cấp quyền ADMIN cho tài khoản ${email} thành công!` });

  } catch (error) {
    res.status(404).json({ message: 'Không tìm thấy người dùng với email này!' });
  }
};

// API Thu hồi quyền Admin
export const revokeAdmin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Vui lòng nhập email cần thu hồi quyền!' });
    }

    await userService.demoteToUser(email);
    res.json({ message: `Đã thu hồi quyền Admin của ${email}. Tài khoản này giờ là User thường.` });

  } catch (error) {
    res.status(404).json({ message: 'Không tìm thấy người dùng!' });
  }
};