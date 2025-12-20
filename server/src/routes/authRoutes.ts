import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Quan ly dang nhap dang ky
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Dang ky tai khoan
 *     tags: [Auth]
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
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Dang ky thanh cong
 *       400:
 *         description: Loi du lieu
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Dang nhap
 *     tags: [Auth]
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
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Dang nhap thanh cong
 *       401:
 *         description: Sai mat khau
 */
router.post("/login", authController.login);

export default router;
