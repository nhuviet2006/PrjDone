import { Request, Response } from "express";
import * as authService from "../services/authService";

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


/* ================= LOGIN ================= */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      message: "Login success",
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
