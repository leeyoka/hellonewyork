'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simplified registration for demo
    // In a real app, you'd call an API to create the user
    login({ 
      id: Date.now(), 
      name, 
      email, 
      username: name.toLowerCase().replace(/\s+/g, ''), 
      balance: 0 
    }, 'fake-jwt-token');
    router.push('/');
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="bento-card w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold font-display text-center">Join yoyo market</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-black/40 uppercase ml-1">Full Name</label>
            <input 
              type="text" 
              className="auth-input" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              required
              suppressHydrationWarning
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-black/40 uppercase ml-1">Email</label>
            <input 
              type="email" 
              className="auth-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
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
              placeholder="••••••••"
              required
              suppressHydrationWarning
            />
          </div>
          <button type="submit" className="btn-primary w-full h-14 mt-4 text-lg" suppressHydrationWarning>Create Account</button>
        </form>
        <p className="text-center text-sm text-black/40">
          Already a member? <Link href="/login" className="text-black font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
