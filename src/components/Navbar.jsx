'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { ShoppingBag, User, LogOut, LayoutGrid } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart, setCartOpen } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 border-b border-bento-border bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-display tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            <LayoutGrid size={24} />
          </div>
          <span>yoyo market</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-black/60">Shop</Link>
          
          <button 
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-bento-border bg-white transition-all hover:bg-black hover:text-white"
            suppressHydrationWarning
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white outline outline-2 outline-white">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden border-l border-bento-border h-6 md:block" />
              <div className="flex items-center gap-2 rounded-full border border-bento-border bg-white px-4 py-2 text-sm font-medium">
                <User size={16} />
                {user.name}
              </div>
              <button
                onClick={handleLogout}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-bento-border bg-white transition-all hover:bg-red-50 hover:text-red-500"
                suppressHydrationWarning
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium hover:text-black/60">Sign in</Link>
              <Link href="/register" className="btn-primary py-2 px-5 text-sm">Join now</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
