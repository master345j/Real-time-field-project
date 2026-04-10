const Product = require('../models/Product');

const fallbackProducts = [
  {
    platform: 'Amazon',
    category: 'shopping',
    name: 'Premium Super Gadget',
    description: 'Top-rated electronics with fast delivery.',
    price: 34999,
    currency: '₹',
    rating: 4.9,
    deliveryDays: 1,
    url: 'https://amazon.in/search?q=super+gadget',
    color: '#ff9900',
  },
  {
    platform: 'Flipkart',
    category: 'shopping',
    name: 'Smart Fashion Bundle',
    description: 'Curated outfit picks from major brands.',
    price: 21999,
    currency: '₹',
    rating: 4.7,
    deliveryDays: 2,
    url: 'https://flipkart.com/search?q=fashion+bundle',
    color: '#047bd5',
  },
  {
    platform: 'Uber',
    category: 'ride',
    name: 'Fast Premium Ride',
    description: 'Quick pick-up from nearby drivers.',
    price: 450,
    currency: '₹',
    rating: 4.8,
    deliveryDays: 0,
    url: 'https://m.uber.com/looking?drop=',
    color: '#000000',
  },
  {
    platform: 'Zomato',
    category: 'food',
    name: 'Hot Meal Delivery',
    description: 'Trusted restaurants, cooked fresh.',
    price: 350,
    currency: '₹',
    rating: 4.6,
    deliveryDays: 0,
    url: 'https://www.zomato.com/search?keyword=',
    color: '#e23744',
  },
  {
    platform: 'Instamart',
    category: 'grocery',
    name: 'Fresh Essentials Pack',
    description: 'Groceries delivered in minutes.',
    price: 180,
    currency: '₹',
    rating: 4.7,
    deliveryDays: 0,
    url: 'https://www.swiggy.com/instamart/search?custom_back=true&query=',
    color: '#fc8019',
  },
];

const buildResult = (item) => {
  return {
    platform: item.platform,
    productName: item.name,
    price: item.price,
    currency: item.currency || '₹',
    rating: item.rating || 4.5,
    deliveryDays: item.deliveryDays || 1,
    url: item.url,
    color: item.color || '#4facfe',
    score: 0,
  };
};

const scoreProduct = (item) => {
  const priceScore = (100000 / item.price) * 0.55;
  const deliveryScore = (5 / Math.max(item.deliveryDays, 1)) * 0.3;
  const ratingScore = (item.rating / 5) * 0.15;
  return priceScore + deliveryScore + ratingScore;
};

const generateFallback = async (query, category) => {
  const matches = fallbackProducts
    .filter((item) => {
      if (category && item.category !== category) return false;
      return [item.name, item.description, item.platform].some((field) =>
        field.toLowerCase().includes(query.toLowerCase())
      );
    })
    .map((item) => ({ ...item, score: scoreProduct(item) }));

  const result = matches.length ? matches : fallbackProducts.filter((item) => !category || item.category === category);
  result.sort((a, b) => b.score - a.score);
  if (result[0]) result[0].bestChoice = true;
  return result;
};

const searchProducts = async (query, category = '') => {
  if (!query) return [];
  const regex = new RegExp(query.split(' ').join('|'), 'i');
  const filter = {
    $or: [
      { name: regex },
      { description: regex },
      { platform: regex },
      { category: regex },
    ],
  };

  if (category) {
    filter.category = category;
  }

  try {
    const products = await Product.find(filter).limit(12).lean();
    if (!products.length) {
      return await generateFallback(query, category);
    }

    const results = products.map((item) => {
      const result = buildResult(item);
      result.score = scoreProduct(result);
      return result;
    });

    results.sort((a, b) => b.score - a.score);
    if (results[0]) results[0].bestChoice = true;
    return results;
  } catch (err) {
    return generateFallback(query, category);
  }
};

module.exports = { searchProducts };
