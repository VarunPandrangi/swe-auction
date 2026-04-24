import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Online Auction System',
  description: 'A real-time auction marketplace for students',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
