import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Lấy danh sách tất cả sự kiện 
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
      image: data.image, 
      
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
    throw new Error("Bạn đã đăng ký sự kiện này rồi!");
  }

  return await prisma.ticket.create({
    data: {
      userId: userId,
      eventId: eventId
    }
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

// 5. Cập nhật sự kiện 
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
      image: data.image
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