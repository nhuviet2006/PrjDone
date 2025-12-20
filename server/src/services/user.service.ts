import { prisma } from '../utils/db';

// Hàm tìm user theo email và đổi role thành ADMIN
export const promoteToAdmin = async (email: string) => {
  // 1. Kiểm tra xem user có tồn tại không
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  // 2. Cập nhật quyền
  return await prisma.user.update({
    where: { email: email },
    data: { role: 'ADMIN' }
  });
};

// Hàm thu hồi quyền Admin (chuyển về USER)
export const demoteToUser = async (email: string) => {
  // 1. Kiểm tra tồn tại
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  // 2. Cập nhật về role USER
  return await prisma.user.update({
    where: { email: email },
    data: { role: 'USER' }
  });
};