import './globals.css';
import { Providers } from '../components/Providers';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata = {
  title: 'Yoyo Market',
  description: 'Curated essentials for your lifestyle',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#F9FAFB]" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <CartDrawer />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
