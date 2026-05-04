'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import { Plus, Tag, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { cn } from '../lib/utils';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('/api/items');
        setItems(res.data.payload || []);
      } catch (err) {
        console.error('Failed to fetch items', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = (items || []).filter(item => 
    (item.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (item.description || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold font-display leading-tight md:text-6xl"
          >
            Curated essentials <br />
            <span className="text-black/40">for your lifestyle.</span>
          </motion.h1>
          <div className="mt-8 relative max-w-md group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none z-20">
              <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Search premium items..."
              className="auth-input h-14 text-lg bg-white/50 backdrop-blur-sm border-bento-border hover:bg-white transition-all shadow-sm !pl-16 w-full relative z-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              suppressHydrationWarning
            />
          </div>
        </div>
        
        <div className="hidden flex-shrink-0 md:block">
          <div className="bento-card py-4 px-6 bg-white flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-bento-green flex items-center justify-center text-green-600">
               <Sparkles size={20} />
             </div>
             <div>
                <p className="text-xs font-bold uppercase text-black/40">New Arrival</p>
                <p className="text-sm font-bold">Uji Organic Tea</p>
             </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-3 lg:grid-cols-6 lg:grid-rows-2">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bento-card h-64 animate-pulse bg-black/5" />
          ))
        ) : (
          filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "group bento-card relative flex flex-col overflow-hidden p-0",
                index === 0 && "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
                index === 1 && "md:col-span-2 lg:col-span-2",
                index === 2 && "md:col-span-2 lg:col-span-2",
                index === 3 && "lg:col-span-3",
                index === 4 && "lg:col-span-1",
                index === 5 && "lg:col-span-2",
                index === 6 && "lg:col-span-2 md:col-span-2",
                index === 7 && "lg:col-span-2 md:col-span-4"
              )}
            >
              <div className="absolute inset-0 h-full w-full">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-indigo-900/90" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-sm">
                    <Tag size={20} className="text-white" />
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur-md">
                    #{item.id}
                  </span>
                </div>
                
                <div className="mt-auto">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold font-display leading-tight">{item.name}</h3>
                    <p className="mt-1 text-sm text-white/70 line-clamp-1 group-hover:line-clamp-none transition-all">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase text-white/50 block">Investment</span>
                      <div className="text-2xl font-bold">
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(item)}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-xl transition-all hover:scale-110 active:scale-95 group-hover:bg-bento-blue group-hover:text-black"
                    >
                      <Plus size={28} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )))}

        {!loading && filteredItems.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-2xl font-bold text-black/20">No matching essentials found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
