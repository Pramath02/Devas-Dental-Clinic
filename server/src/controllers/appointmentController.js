import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  // Use globalFor in production to prevent multiple Prisma Client instances
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
}

export async function createAppointment(req, res, next) {
  try {
    const { name, email, phone, date, time, service, message } = req.body;

    // Validation
    if (!name || !email || !phone || !date || !service) {
      return res.status(400).json({ error: 'Name, email, phone, date, and service are required.' });
    }

    // Validate and format date to YYYY-MM-DD format
    let formattedDate = date;
    if (typeof date === 'string') {
      // Extract just the date part (YYYY-MM-DD) from the input
      // Also handles ISO timestamps like "2026-07-21T00:00:00.000Z"
      const dateMatch = date.match(/^(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        formattedDate = dateMatch[1];
      } else {
        return res.status(400).json({ error: 'Invalid date format. Expected YYYY-MM-DD format.' });
      }
    } else if (date instanceof Date) {
      // Handle Date objects passed directly - extract YYYY-MM-DD
      formattedDate = date.toISOString().split('T')[0];
    }

    // Validate time format (HH:MM 24-hour) - HTML5 time input provides this format
    let formattedTime = time || null;
    if (time && typeof time === 'string') {
      const trimmedTime = time.trim();
      // HTML5 time input provides time in HH:MM format (e.g., "21:00", "09:30")
      const timeMatch = trimmedTime.match(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/);
      if (!timeMatch) {
        return res.status(400).json({ error: 'Invalid time format. Expected HH:MM format.' });
      }
      // Ensure time is in HH:MM format with proper padding
      const [, hours, minutes] = timeMatch;
      formattedTime = `${hours.padStart(2, '0')}:${minutes}`;
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        date: new Date(formattedDate),
        time: formattedTime,
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