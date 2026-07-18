import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createContactMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
      },
    });

    res.status(201).json({ success: true, contactMessage });
  } catch (error) {
    next(error);
  }
}