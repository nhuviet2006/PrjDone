import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Lấy danh sách tất cả sự kiện (Sắp xếp theo ngày tạo mới nhất)
export const getAllEvents = async () => {
  return await prisma.event.findMany({
    orderBy: { createdAt: 'desc' }, 
    include: {
      tickets: true 
    }
  });
};

// 2. Tạo sự kiện mới 
export const createEvent = async (data: any, userId: number) => {
  return await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      
      price: parseFloat(data.price),             
      totalTickets: parseInt(data.totalTickets), 
      
      date: data.date,       
      month: data.month,
      time: data.time,
      speaker: data.speaker,
      image: data.image, // Link ảnh từ Cloudinary
      
      createdBy: {
        connect: { id: userId }
      }
    },
  });
};

// 3. Mua vé (Đăng ký sự kiện)
export const registerEvent = async (userId: number, eventId: number) => {
  const existingTicket = await prisma.ticket.findFirst({
    where: {
      userId: userId,
      eventId: eventId
    }
  });

  if (existingTicket) {
    throw new Error("Bạn đã đăng ký sự kiện này rồi! Không thể mua thêm.");
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });

  if (!event) {
    throw new Error("Sự kiện không tồn tại!");
  }

  if (event.totalTickets <= 0) {
    throw new Error("Rất tiếc, sự kiện đã hết vé!");
  }

  return await prisma.$transaction(async (tx) => {
    const newTicket = await tx.ticket.create({
      data: {
        userId: userId,
        eventId: eventId
      }
    });

    await tx.event.update({
      where: { id: eventId },
      data: {
        totalTickets: {
          decrement: 1 
        }
      }
    });

    return newTicket;
  });
};

// 4. Lấy danh sách vé của User 
export const getTicketsByUserId = async (userId: number) => {
    return prisma.ticket.findMany({
        where: { userId },
        include: {
            event: {
                select: {
                    id: true,
                    title: true,
                    date: true,
                    month: true,
                    time: true,
                    location: true,
                    image: true,
                    description: true,
                    price: true
                }
            }
        },
        orderBy: {
            purchasedAt: 'desc'
        }
    });
};

// 5. Cập nhật sự kiện (Đã bổ sung đầy đủ các trường)
export const updateEvent = async (id: number, data: any) => {
  return await prisma.event.update({
    where: { id: id },
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      
      // Chỉ cập nhật nếu có dữ liệu gửi lên
      price: data.price ? parseFloat(data.price) : undefined,
      totalTickets: data.totalTickets ? parseInt(data.totalTickets) : undefined,
      
      date: data.date,
      month: data.month,
      time: data.time,
      speaker: data.speaker,
      image: data.image // Cho phép cập nhật ảnh mới
    }
  });
};

// 6. Xóa sự kiện
export const deleteEvent = async (id: number) => {
  return await prisma.event.delete({
    where: { id: id }
  });
};
// 7. Lấy danh sách sự kiện do User tạo
export const getEventsByCreator = async (userId: number) => {
  return await prisma.event.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc' 
    },
    include: {
      tickets: true 
    }
  });
};