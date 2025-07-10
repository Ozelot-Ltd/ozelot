import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import ContactFormMain from '@/emails/Contactform/Main';
import OzelotMail from '@/emails/Contactform/OzelotMail';
import { FormData } from '@/app/components/SectionComponents/ContactComponent/components/ContactForm';

const resend = new Resend(process.env.RESEND_CONTACTFORM_MAIN);

export async function POST(request: Request) {
  // First, get the form data from the request
  const formData: FormData = await request.json();

  const { name, surname } = formData;

  try {
    const [data, ozelotData] = await Promise.all([
      resend.emails.send({
        from: 'Ozelot Studios <studio@ozelot.ltd>',
        to: formData.email,
        subject: 'Ozelot Studios - Contact Form',
        react: ContactFormMain(formData),
      }),
      resend.emails.send({
        from: 'Website Contact Form <studio@ozelot.ltd>',
        to: 'studio@ozelot.ltd',
        subject: `${name} ${surname} - Contact Form Submission`,
        react: OzelotMail(formData),
      }),
    ]);

    return NextResponse.json({ success: true, data, ozelotData });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
