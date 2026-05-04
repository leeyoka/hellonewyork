
// Mock Database for in-memory storage to simulate PostgreSQL behavior
class MockDB {
  constructor() {
    console.log('Connected to PostgreSQL database');
  }
  users = [
    { id: 1, name: 'Alice', username: 'alice', email: 'alice@example.com', phone: '+1-555-0100', password: '$2b$10$9DtbGXv7rqf3IXw7LUCSU.3GdeBc6mnOSVqZFvajImIlWS/DW9vC.', balance: 50000, created_at: new Date() },
    { id: 2, name: 'Bob', username: 'bob', email: 'bob@example.com', phone: '+1-555-0101', password: '$2b$10$ilibROd7gIHhlQSWQ32n0OdGzPuPYVxQzR3LMfR7WF2GglADcuUWK', balance: 0, created_at: new Date() },
    { id: 3, name: 'Charlie', username: 'charlie', email: 'charlie@example.com', phone: '+1-555-0102', password: '$2b$10$Ep/lp/gzriH41bSOQKGCrujr6W5lUBpbdmGupAaMJzoYB2TxGTGYO', balance: 100000, created_at: new Date() },
    { id: 4, name: 'John Doe', username: 'johndoe', email: 'john@example.com', phone: '+62 812 3456 7890', password: '$2a$10$fVp6eM7u7.vNfN.FkGf8.eD8U9fFp8mD9U9fFp8mD9U9fFp8mD9U9', balance: 250000, created_at: new Date() }
  ];

  items = [
    { id: 1, name: "Premium Coffee Beans", price: 150000, stock: 50, color: "bento-blue", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800", description: "Ethically sourced dark roast beans." },
    { id: 2, name: "Studio Headphones", price: 2450000, stock: 12, color: "bento-purple", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800", description: "Professional-grade noise canceling audio." },
    { id: 3, name: "Minimalist Hoodie", price: 450000, stock: 30, color: "bento-pink", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800", description: "Heavyweight cotton for maximum comfort." },
    { id: 4, name: "Mechanical Keyboard", price: 1850000, stock: 8, color: "bento-blue", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800", description: "Tactile switches with RGB backlight." },
    { id: 5, name: "Ceramic Coffee Mug", price: 120000, stock: 25, color: "bento-yellow", image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=800", description: "Handcrafted matte finish ceramic." },
    { id: 6, name: "Leather Workspace Mat", price: 350000, stock: 15, color: "bento-green", image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800", description: "Premium Italian leather desk accessory." },
    { id: 7, name: "Portable Speaker", price: 1250000, stock: 10, color: "bento-blue", image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=800", description: "Waterproof bluetooth speaker with deep bass." },
    { id: 8, name: "Designer Sunglasses", price: 3200000, stock: 5, color: "bento-purple", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800", description: "UV-protected luxury eyewear." },
  ];

  transactions = [];

  async query(text, params = []) {
    const sql = text.toLowerCase().trim();
    
    if (sql.includes('select * from items')) {
      if (sql.includes('where id = $1')) {
        const item = this.items.find(i => i.id === Number(params[0]));
        return { rows: item ? [item] : [] };
      }
      return { rows: this.items };
    }

    if (sql.includes('from users')) {
      if (sql.includes('where email = $1')) {
        const user = this.users.find(u => u.email === params[0]);
        return { rows: user ? [user] : [] };
      }
      if (sql.includes('where username = $1')) {
        const user = this.users.find(u => u.username === params[0]);
        return { rows: user ? [user] : [] };
      }
       if (sql.includes('where id = $1')) {
        const user = this.users.find(u => u.id === Number(params[0]));
        return { rows: user ? [user] : [] };
      }
    }

    if (sql.includes('insert into users')) {
      const newUser = {
        id: this.users.length + 1,
        name: params[0],
        username: params[1],
        email: params[2],
        phone: params[3],
        password: params[4],
        balance: params[5] || 0,
        created_at: new Date()
      };
      this.users.push(newUser);
      return { rows: [newUser] };
    }

    if (sql.includes('insert into transactions')) {
      const newTransaction = {
        id: this.transactions.length + 1,
        user_id: params[0],
        item_id: params[1],
        quantity: params[2],
        total: params[3],
        status: params[4] || 'pending',
        description: params[5],
        created_at: new Date()
      };
      this.transactions.push(newTransaction);
      return { rows: [newTransaction] };
    }

    if (sql.includes('update users set balance = balance - $1')) {
       const user = this.users.find(u => u.id === params[1]);
       if (user && user.balance >= params[0]) {
         user.balance -= params[0];
         return { rows: [user] };
       }
       return { rows: [] };
    }

    if (sql.includes('update items set stock = stock - $1')) {
      const item = this.items.find(i => i.id === params[1]);
      if (item && item.stock >= params[0]) {
        item.stock -= params[0];
        return { rows: [item] };
      }
      return { rows: [] };
    }

    return { rows: [] };
  }
}

export default new MockDB();
