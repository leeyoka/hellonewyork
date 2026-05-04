'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../hooks/useCart';
import { ShoppingBag, X, Trash2, Plus, Minus } from 'lucide-react';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setCartOpen, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-bento-border p-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                    <ShoppingBag size={20} />
                  </div>
                  <h2 className="text-xl font-bold font-display">Your Basket</h2>
                </div>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="rounded-full p-2 transition-colors hover:bg-black/5"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-bento-blue text-blue-500">
                      <ShoppingBag size={32} />
                    </div>
                    <p className="text-xl font-bold text-black/40">Your basket is empty</p>
                    <p className="mt-2 text-sm text-black/30">Start adding some essentials to your lifestyle.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-24 w-24 overflow-hidden rounded-2xl border border-bento-border">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-black/40">Rp {item.price.toLocaleString('id-ID')}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center rounded-xl border border-bento-border bg-white px-2 py-1">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:text-black/60"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:text-black/60"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-bento-border p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-black/40 uppercase">Total Investment</span>
                    <span className="text-2xl font-bold">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <button className="btn-primary w-full h-14 text-lg">Checkout Now</button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
