import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import ContactFormMain from '@/emails/Contactform/Main';
import { FormData } from '@/app/components/SectionComponents/ContactComponent/components/ContactForm';

const resend = new Resend(process.env.RESEND_CONTACTFORM_MAIN);

export async function POST(request: Request) {
  // First, get the form data from the request
  const formData: FormData = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'Ozelot Studios <carlo@ozelot.ltd>',
      to: formData.email,
      subject: 'Ozelot Studios - Contact Form',
      react: ContactFormMain(formData),
    });

    // Return a success response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
