const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

// New products with guaranteed working images
const products = [
  {
    id: 1,
    name: 'Chair',
    description: 'Festive holiday sweater with snowflake design. Made from 100% premium wool for maximum comfort and warmth during winter seasons.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=400&h=400&fit=crop',
    category: 'Clothing',
    festive: true,
    inStock: true,
    rating: 4.5,
    reviews: [
      { user: 'John D.', rating: 5, comment: 'Perfect for Christmas party!', date: '2024-12-15' },
      { user: 'Sarah M.', rating: 4, comment: 'Very warm and comfortable', date: '2024-12-10' },
      { user: 'Mike R.', rating: 4, comment: 'Good quality, fits well', date: '2024-12-08' }
    ]
  },
  {
    id: 2, 
    name: 'Holiday Gift Basket',
    description: 'Premium gift basket with assorted chocolates, cookies, and hot cocoa. Perfect for gifting during festive season.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1549465228-4d6d4c8e1e7c?w=400&h=400&fit=crop',
    category: 'Gifts',
    festive: true,
    inStock: true,
    rating: 4.8,
    reviews: [
      { user: 'Emma W.', rating: 5, comment: 'Amazing gift set! Everyone loved it', date: '2024-12-14' },
      { user: 'David K.', rating: 5, comment: 'Great variety and quality', date: '2024-12-12' }
    ]
  },
  {
    id: 3,
    name: 'Christmas Tree Decorations', 
    description: 'Beautiful Christmas tree ornaments set with 24 pieces including balls, stars, and snowflakes. Bring the holiday spirit to your home.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400&h=400&fit=crop',
    category: 'Home',
    festive: true,
    inStock: true,
    rating: 4.3,
    reviews: [
      { user: 'Lisa T.', rating: 4, comment: 'Beautiful decorations, good quality', date: '2024-12-13' },
      { user: 'Tom B.', rating: 5, comment: 'Made our tree look amazing!', date: '2024-12-11' },
      { user: 'Nancy P.', rating: 4, comment: 'Nice variety of ornaments', date: '2024-12-09' }
    ]
  },
  {
    id: 4,
    name: 'Winter Jacket Pro',
    description: 'Waterproof winter jacket with thermal insulation. Perfect for extreme cold conditions with multiple pockets and adjustable hood.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    category: 'Clothing',
    festive: false,
    inStock: true,
    rating: 4.6,
    reviews: [
      { user: 'Alex C.', rating: 5, comment: 'Very warm, perfect for skiing', date: '2024-12-16' },
      { user: 'Rachel G.', rating: 4, comment: 'Good quality, true to size', date: '2024-12-14' }
    ]
  },
  {
    id: 5,
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with 5G, 256GB storage, triple camera setup, and all-day battery life. Includes fast charger and protective case.',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    category: 'Electronics',
    festive: false,
    inStock: true,
    rating: 4.7,
    reviews: [
      { user: 'Tech Guru', rating: 5, comment: 'Amazing camera quality!', date: '2024-12-15' },
      { user: 'Mobile Fan', rating: 4, comment: 'Fast performance, great display', date: '2024-12-12' },
      { user: 'Sarah J.', rating: 5, comment: 'Best phone I have ever owned', date: '2024-12-10' }
    ]
  },
  {
    id: 6,
    name: 'Premium Coffee Set', 
    description: 'Premium coffee blend from Ethiopian highlands. Medium roast with notes of chocolate and citrus. Perfect for cozy winter evenings.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
    category: 'Food',
    festive: true,
    inStock: true,
    rating: 4.4,
    reviews: [
      { user: 'Coffee Lover', rating: 5, comment: 'Amazing aroma and taste', date: '2024-12-14' },
      { user: 'James B.', rating: 4, comment: 'Great quality coffee', date: '2024-12-11' }
    ]
  },
  {
    id: 7,
    name: 'Wireless Headphones Pro',
    description: 'Noise-cancelling wireless headphones with 40-hour battery life. Perfect for music lovers and frequent travelers.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    festive: false,
    inStock: true,
    rating: 4.5,
    reviews: [
      { user: 'Music Fan', rating: 5, comment: 'Excellent noise cancellation', date: '2024-12-13' },
      { user: 'Traveler', rating: 4, comment: 'Great for flights, comfortable', date: '2024-12-10' }
    ]
  },
  {
    id: 8,
    name: 'Christmas Fruit Cake',
    description: 'Traditional fruit cake with rum infusion. Rich in dry fruits and nuts. Perfect for Christmas celebrations.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
    category: 'Food',
    festive: true,
    inStock: true,
    rating: 4.9,
    reviews: [
      { user: 'Baker Pete', rating: 5, comment: 'Authentic taste, amazing!', date: '2024-12-16' },
      { user: 'Mary K.', rating: 5, comment: 'Best Christmas cake ever!', date: '2024-12-15' }
    ]
  },
  {
    id: 9,
    name: '7ft Christmas Tree',
    description: '7-foot artificial Christmas tree with pre-lit LED lights. Easy setup and storage.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1606836131376-e2d4c45f1b67?w=400&h=400&fit=crop',
    category: 'Home',
    festive: true,
    inStock: true,
    rating: 4.7,
    reviews: [
      { user: 'Home Decor Lover', rating: 5, comment: 'Beautiful tree, easy to assemble', date: '2024-12-14' },
      { user: 'Family Mom', rating: 4, comment: 'Perfect size for our living room', date: '2024-12-12' }
    ]
  },
  {
    id: 10,
    name: 'Festive Scented Candles',
    description: 'Set of 6 scented candles with holiday fragrances: cinnamon, pine, and vanilla.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop',
    category: 'Home',
    festive: true,
    inStock: true,
    rating: 4.4,
    reviews: [
      { user: 'Candle Enthusiast', rating: 5, comment: 'Amazing scents, long lasting', date: '2024-12-13' },
      { user: 'Holiday Host', rating: 4, comment: 'Perfect for creating festive atmosphere', date: '2024-12-11' }
    ]
  },
  {
    id: 11,
    name: 'Gaming Laptop',
    description: 'High-performance gaming laptop with RTX 4060, 16GB RAM, 1TB SSD. Perfect for gamers and content creators.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
    category: 'Electronics',
    festive: false,
    inStock: true,
    rating: 4.8,
    reviews: [
      { user: 'Gamer Pro', rating: 5, comment: 'Runs all games smoothly!', date: '2024-12-14' },
      { user: 'Content Creator', rating: 5, comment: 'Perfect for video editing', date: '2024-12-13' }
    ]
  },
  {
    id: 12,
    name: 'Christmas Stockings Set',
    description: 'Set of 4 personalized Christmas stockings. Perfect for hanging by the fireplace.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1574359411659-619737b6a7e3?w=400&h=400&fit=crop',
    category: 'Home',
    festive: true,
    inStock: true,
    rating: 4.6,
    reviews: [
      { user: 'Family Dad', rating: 5, comment: 'Kids loved their personalized stockings!', date: '2024-12-15' },
      { user: 'Holiday Lover', rating: 4, comment: 'Good quality fabric', date: '2024-12-12' }
    ]
  },
  {
    id: 13,
    name: 'Smart Watch Series 8',
    description: 'Advanced smartwatch with health monitoring, GPS, and always-on display. Track your fitness goals.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
    category: 'Electronics',
    festive: false,
    inStock: true,
    rating: 4.5,
    reviews: [
      { user: 'Fitness Enthusiast', rating: 5, comment: 'Great health tracking features', date: '2024-12-14' },
      { user: 'Tech User', rating: 4, comment: 'Battery lasts 2 days', date: '2024-12-11' }
    ]
  },
  {
    id: 14,
    name: 'Christmas Chocolate Box',
    description: 'Luxury chocolate box with 24 assorted chocolates. Perfect gift for chocolate lovers.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=400&fit=crop',
    category: 'Food',
    festive: true,
    inStock: true,
    rating: 4.7,
    reviews: [
      { user: 'Chocolate Lover', rating: 5, comment: 'Delicious and high quality', date: '2024-12-16' },
      { user: 'Gift Giver', rating: 5, comment: 'Perfect holiday gift', date: '2024-12-14' }
    ]
  },
  {
    id: 15,
    name: 'Winter Boots',
    description: 'Waterproof winter boots with thermal insulation and anti-slip sole. Perfect for snow and ice.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'Clothing',
    festive: false,
    inStock: true,
    rating: 4.4,
    reviews: [
      { user: 'Winter Walker', rating: 5, comment: 'Very warm and comfortable', date: '2024-12-13' },
      { user: 'Outdoor Enthusiast', rating: 4, comment: 'Great grip on ice', date: '2024-12-10' }
    ]
  },
  {
    id: 16,
    name: 'Christmas Lights Set',
    description: 'LED Christmas lights with 100 bulbs and 8 lighting modes. Waterproof for outdoor use.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop',
    category: 'Home',
    festive: true,
    inStock: true,
    rating: 4.3,
    reviews: [
      { user: 'Home Decorator', rating: 4, comment: 'Beautiful lights, easy to install', date: '2024-12-14' },
      { user: 'Holiday Enthusiast', rating: 5, comment: 'Made our house look magical', date: '2024-12-12' }
    ]
  },
  {
    id: 17,
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360 sound, 20-hour battery, and waterproof design.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'Electronics',
    festive: false,
    inStock: true,
    rating: 4.6,
    reviews: [
      { user: 'Music Lover', rating: 5, comment: 'Amazing sound quality', date: '2024-12-13' },
      { user: 'Party Host', rating: 4, comment: 'Great for outdoor parties', date: '2024-12-11' }
    ]
  },
  {
    id: 18,
    name: 'Christmas Pyjamas Set',
    description: 'Family matching Christmas pyjamas set. Available in multiple sizes for the whole family.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    category: 'Clothing',
    festive: true,
    inStock: true,
    rating: 4.8,
    reviews: [
      { user: 'Family Mom', rating: 5, comment: 'Perfect for Christmas morning photos!', date: '2024-12-15' },
      { user: 'Holiday Lover', rating: 5, comment: 'Comfortable and festive', date: '2024-12-13' }
    ]
  },
  {
    id: 19,
    name: 'Tablet Pro',
    description: '10-inch tablet with 128GB storage, stylus support, and all-day battery. Perfect for work and entertainment.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop',
    category: 'Electronics',
    festive: false,
    inStock: true,
    rating: 4.5,
    reviews: [
      { user: 'Student', rating: 5, comment: 'Great for note-taking', date: '2024-12-14' },
      { user: 'Professional', rating: 4, comment: 'Perfect for business trips', date: '2024-12-12' }
    ]
  },
  {
    id: 20,
    name: 'Christmas Wreath',
    description: 'Beautiful handmade Christmas wreath with pine cones, berries, and red bow. Perfect for front door decoration.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1574359411659-619737b6a7e3?w=400&h=400&fit=crop',
    category: 'Home',
    festive: true,
    inStock: true,
    rating: 4.7,
    reviews: [
      { user: 'Home Owner', rating: 5, comment: 'Beautiful and well-made', date: '2024-12-16' },
      { user: 'Decor Lover', rating: 5, comment: 'Perfect holiday welcome', date: '2024-12-14' }
    ]
  }
];

// Get all products with search and filter
app.get('/api/products', (req, res) => {
  const { search, category, minPrice, maxPrice, festive } = req.query;
  
  let filteredProducts = [...products];

  // Search filter
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Category filter
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  // Price filter
  if (minPrice) {
    filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
  }

  // Festive filter
  if (festive === 'true') {
    filteredProducts = filteredProducts.filter(product => product.festive);
  }

  res.json({ products: filteredProducts });
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json({ product });
});

// Get categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(product => product.category))];
  res.json({ categories });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
