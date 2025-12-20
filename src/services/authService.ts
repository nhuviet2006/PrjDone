import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/db";

const SALT_ROUNDS = 10;

/* ================= REGISTER ================= */
export const register = async (
  fullName: string,
  email: string,
  password: string
) => {
  const existUser = await prisma.user.findUnique({ where: { email } });
  if (existUser) {
    throw new Error("Email already exists");
  }

  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashPassword,
    },
  });

  return user;
};



/* ================= LOGIN ================= */
export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    },
  };
};

/* ================= TOKEN HELPERS ================= */
export const generateAccessToken = (user: { id: number; role: string }) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" }
  );
};
