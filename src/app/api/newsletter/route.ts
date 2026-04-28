import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore as any);

    // 1. Store in Supabase
    const { error: dbError } = await supabase
      .from('newsletter_subs')
      .upsert({ email });

    if (dbError) {
      console.warn('DB Error in Newsletter:', dbError.message);
    }

    // 2. Send Welcome Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Gestar <welcome@your-domain.com>',
        to: [email],
        subject: 'Welcome to the Orbit',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px; border-radius: 20px;">
            <h1 style="text-transform: uppercase; letter-spacing: -1px; font-weight: 900; margin-bottom: 20px;">Welcome to the Orbit</h1>
            <p style="color: #888; line-height: 1.6; margin-bottom: 30px;">You are now part of the elite. We'll only contact you for major drops and exclusive orbital event updates.</p>
            <div style="background: #111; padding: 20px; border-radius: 10px; border: 1px solid #222;">
              <span style="font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: 2px;">Your Status</span>
              <p style="font-weight: bold; margin-top: 5px; color: #00ffff;">ACTIVE SUBSCRIBER</p>
            </div>
            <p style="font-size: 10px; color: #333; margin-top: 40px; text-transform: uppercase;">&copy; ${new Date().getFullYear()} GESTAR ORIGINALS</p>
          </div>
        `
      });
    } else {
      console.log(`[Mock Newsletter Welcome] Email sent to: ${email}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
