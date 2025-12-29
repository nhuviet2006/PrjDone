import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Quản lý đăng nhập, đăng ký
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản User
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi dữ liệu
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai mật khẩu
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/register-event:
 *   post:
 *     summary: Đăng ký tham gia sự kiện (Ticket)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventName
 *               - fullName
 *               - phone
 *               - email
 *             properties:
 *               eventName:
 *                 type: string
 *                 example: Pickleball Hành Trình Nhân Ái
 *               fullName:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               dob:
 *                 type: string
 *                 example: 01/01/2000
 *               idCard:
 *                 type: string
 *                 example: 0123456789
 *               phone:
 *                 type: string
 *                 example: 0909123456
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *     responses:
 *       201:
 *         description: Đăng ký sự kiện thành công
 *       400:
 *         description: Thiếu thông tin
 */
router.post("/register-event", authController.registerEvent);

export default router;
