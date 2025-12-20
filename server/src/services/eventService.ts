import { prisma } from '../utils/db';

// 1. Lấy danh sách sự kiện
export const getAllEvents = async () => {
  return await prisma.event.findMany({
    orderBy: { date: 'asc' }, // Sắp xếp ngày gần nhất lên đầu
    include: {
      tickets: true // (Tùy chọn) Lấy kèm thông tin vé đã bán
    }
  });
};

// 2. Tạo sự kiện mới
export const createEvent = async (data: any) => {
  return await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      price: parseFloat(data.price),      // Đảm bảo giá là số
      totalTickets: parseInt(data.totalTickets), // Đảm bảo số vé là số nguyên
      date: new Date(data.date)           // Chuyển string thành ngày tháng
    }
  });
};

// 3. Mua vé (Đăng ký sự kiện)
export const registerEvent = async (userId: number, eventId: number) => {
  // Logic: Tạo một vé mới nối User với Event
  return await prisma.ticket.create({
    data: {
      userId: userId,
      eventId: eventId
    }
  });
};

// 4. Lấy danh sách vé của một User
export const getTicketsByUserId = async (userId: number) => {
  return await prisma.ticket.findMany({
    where: {
      userId: userId // Tìm vé của user này
    },
    include: {
      event: true // Kèm theo thông tin chi tiết của sự kiện đó
    }
  });
};


// 5. Cập nhật sự kiện
export const updateEvent = async (id: number, data: any) => {
  return await prisma.event.update({
    where: { id: id },
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      price: data.price ? parseFloat(data.price) : undefined,
      totalTickets: data.totalTickets ? parseInt(data.totalTickets) : undefined,
      date: data.date ? new Date(data.date) : undefined
    }
  });
};

// 6. Xóa sự kiện
export const deleteEvent = async (id: number) => {
  return await prisma.event.delete({
    where: { id: id }
  });
};