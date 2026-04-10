const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require(path.join(__dirname, '..', 'src', 'models', 'User'));
const Product = require(path.join(__dirname, '..', 'src', 'models', 'Product'));

const SAMPLE_PRODUCTS = [
  {
    platform: 'Amazon',
    category: 'shopping',
    name: 'Apple AirPods Pro',
    description: 'Noise-cancelling earbuds with spatial audio.',
    price: 19999,
    currency: '₹',
    rating: 4.8,
    deliveryDays: 1,
    url: 'https://amazon.in/s?k=airpods+pro',
    color: '#ff9900',
    image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?w=200',
  },
  {
    platform: 'Flipkart',
    category: 'shopping',
    name: 'Samsung Galaxy Fit2',
    description: 'Fitness tracker with OLED display and long battery life.',
    price: 3499,
    currency: '₹',
    rating: 4.4,
    deliveryDays: 2,
    url: 'https://www.flipkart.com/search?q=galaxy+fit2',
    color: '#047bd5',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200',
  },
  {
    platform: 'Uber',
    category: 'ride',
    name: 'Uber Comfort',
    description: 'Premium vehicle with extra legroom for your trip.',
    price: 610,
    currency: '₹',
    rating: 4.7,
    deliveryDays: 0,
    url: 'https://m.uber.com/looking?drop=',
    color: '#000000',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200',
  },
  {
    platform: 'Zomato',
    category: 'food',
    name: 'Pizza Margherita',
    description: 'Classic pizza with fresh mozzarella and basil.',
    price: 299,
    currency: '₹',
    rating: 4.5,
    deliveryDays: 0,
    url: 'https://www.zomato.com/search?keyword=pizza',
    color: '#e23744',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200',
  },
  {
    platform: 'Instamart',
    category: 'grocery',
    name: 'Daily Essentials Kit',
    description: 'Milk, bread, eggs and fresh vegetables delivered fast.',
    price: 499,
    currency: '₹',
    rating: 4.6,
    deliveryDays: 0,
    url: 'https://www.swiggy.com/instamart/search?custom_back=true&query=essentials',
    color: '#fc8019',
    image: 'https://images.unsplash.com/photo-1515548211529-1681c9f5f55e?w=200',
  },
];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Copy .env.example to .env');
    process.exit(1);
  }

  await mongoose.connect(uri);

  const email = 'alex@example.com';
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('pass123', salt);
    await User.create({
      name: 'Alex M.',
      email,
      password: hashedPassword,
      phone: '0000000000',
      role: 'user',
    });
    console.log('Created demo user:', email, '/ pass123');
  } else {
    console.log('Demo user already exists:', email);
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(SAMPLE_PRODUCTS);
    console.log('Seeded sample products into MongoDB');
  } else {
    console.log('Products already seeded:', productCount);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
