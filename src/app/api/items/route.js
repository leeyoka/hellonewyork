import { NextResponse } from 'next/server';
import db from '../../../database/database';

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM items');
    let items = result.rows;
    
    // Fallback if DB returns empty
    if (!items || items.length === 0) {
      items = [
        { id: 1, name: "Fallback Coffee", price: 150000, stock: 50, color: "bento-blue", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800", description: "Ethically sourced beans." },
      ];
    }
    
    console.log('API /api/items success, count:', items?.length);
    return NextResponse.json({
      success: true,
      payload: items,
    });
  } catch (error) {
    console.error('API /api/items error:', error);
    const fallback = [
      { id: 1, name: "Error Fallback Coffee", price: 150000, stock: 50, color: "bento-blue", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800", description: "Ethically sourced beans." },
    ];
    return NextResponse.json({ success: true, payload: fallback });
  }
}
