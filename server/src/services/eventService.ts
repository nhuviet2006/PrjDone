// import { prisma } from '../utils/db';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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
// 1. Lấy danh sách sự kiện
export const getAllEvents = async () => {
  return await prisma.event.findMany({
    orderBy: { date: 'asc' }, 
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
      price: Number(data.price),             
      totalTickets: Number(data.totalTickets), 
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
  return await prisma.ticket.create({
    data: {
      userId: userId,
      eventId: eventId
    }
  });
};

// 4. Lấy danh sách vé của một User
export const getMyTickets = async (userId: number) => {
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
      date: data.date
    }
  });
};

// 6. Xóa sự kiện
export const deleteEvent = async (id: number) => {
  return await prisma.event.delete({
    where: { id: id }
  });
};