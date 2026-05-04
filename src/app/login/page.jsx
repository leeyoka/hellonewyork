'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simplified login for demo
    login({ id: 4, name: 'John Doe', email, username: 'johndoe', balance: 250000 }, 'fake-jwt-token');
    router.push('/');
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="bento-card w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold font-display text-center">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-black/40 uppercase ml-1">Email</label>
            <input 
              type="email" 
              className="auth-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              suppressHydrationWarning
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-black/40 uppercase ml-1">Password</label>
            <input 
              type="password" 
              className="auth-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              suppressHydrationWarning
            />
          </div>
          <button type="submit" className="btn-primary w-full h-14 mt-4 text-lg" suppressHydrationWarning>Sign In</button>
        </form>
        <p className="text-center text-sm text-black/40">
          New here? <Link href="/register" className="text-black font-bold">Join now</Link>
        </p>
      </div>
    </div>
  );
}
