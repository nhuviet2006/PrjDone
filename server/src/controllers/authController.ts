import { Request, Response } from "express";
import * as authService from "../services/authService";
import { prisma } from "../utils/db";
/* ================= REGISTER ================= */
export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await authService.register(fullName, email, password);

    res.status(201).json({
      message: "Register success",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      message: "Login success",
      accessToken: result.accessToken,
      user: {
        id: result.user.id,
        fullName: result.user.fullName,
        email: result.user.email,
        role: result.user.role  
      },
    });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const registerEvent = async (req: Request, res: Response) => {
  try {
    const { eventName, ticketClass, fullName, dob, idCard, phone, email, userId } = req.body;
    if (!eventName || !ticketClass || !fullName || !idCard || !phone || !email) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin bắt buộc" });
    }
    const newReg = await prisma.registration.create({
      data: {
        eventName,
        ticketClass, 
        fullName,
        dob,
        idCard,
        phone,
        email,
        userId: userId ? parseInt(userId) : null
      }
    });

    res.status(201).json({ message: "Đăng ký thành công!", data: newReg });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};
