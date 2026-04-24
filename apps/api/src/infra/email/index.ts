import { env } from '@shared/env';
import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, html: string) {
  if (env.NODE_ENV === 'development' && env.SMTP_HOST === 'dev-console') {
    process.stdout.write(`Email to: ${to}\nSubject: ${subject}\nContent: ${html}\n`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Auction System" <noreply@auction.edu>',
    to,
    subject,
    html,
  });
}
