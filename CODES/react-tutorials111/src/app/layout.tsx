/*
 * @Author: Lee
 * @Date: 2023-07-26 11:47:50
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-30 09:45:10
 * @Description: 
 */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='p-4'>{children}</div>
      </body>
    </html>
  );
}