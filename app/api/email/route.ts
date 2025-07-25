import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '../../components/EmailTemplate.tsx';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { name, email, eventDate, eventType, notes } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'TDP Factory <noreply@tdpfactory.com>',
      to: [email, "treyc3dash@gmail.com"],
      subject: 'Thank you for your booking request!',
      react: EmailTemplate({ name, eventDate, eventType, notes })
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 