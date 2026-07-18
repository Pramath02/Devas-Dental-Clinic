import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAppointment(req, res, next) {
  try {
    const { name, email, phone, date, time, service, message } = req.body;

    // Validation
    if (!name || !email || !phone || !date || !service) {
      return res.status(400).json({ error: 'Name, email, phone, date, and service are required.' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        date: new Date(date),
        time: time || null,
        service,
        notes: message || null,
      },
    });

    res.status(201).json({ success: true, appointment });
  } catch (error) {
    next(error);
  }
}

export async function listAppointments(req, res, next) {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ appointments });
  } catch (error) {
    next(error);
  }
}