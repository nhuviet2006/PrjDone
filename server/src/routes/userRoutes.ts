import { Router } from 'express';
import { promoteUser, revokeAdmin } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeAdmin } from '../middlewares/roleMiddleware';

const router = Router();

// 1. Cấp quyền Admin
router.post('/promote-admin', authenticate, authorizeAdmin, promoteUser);

// 2. Thu hồi quyền Admin
router.post('/revoke-admin', authenticate, authorizeAdmin, revokeAdmin);

export default router;