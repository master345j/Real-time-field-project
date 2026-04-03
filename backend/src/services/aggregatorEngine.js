const searchProducts = async (query) => {
    // Mocking real-time scraping / API fetching for Amazon & Flipkart
    const amazonPrice = Math.floor(Math.random() * (50000 - 30000) + 30000);
    const flipkartPrice = amazonPrice + (Math.floor(Math.random() * 2000 - 1000)); 
    
    // Aggregated list format normalization
    let results = [
        {
            platform: 'Amazon',
            productName: `Apple iPhone 15 Pro - ${query}`,
            price: amazonPrice,
            currency: '₹',
            rating: 4.8,
            deliveryDays: 1, // Prime
            url: `https://amazon.in/search?q=${query}`,
            logo: 'fa-amazon',
            color: '#ff9900',
            score: 0
        },
        {
            platform: 'Flipkart',
            productName: `Apple iPhone 15 Mobile - ${query}`,
            price: flipkartPrice,
            currency: '₹',
            rating: 4.6,
            deliveryDays: 3,
            url: `https://flipkart.com/search?q=${query}`,
            logo: 'fa-cart-shopping',
            color: '#047bd5',
            score: 0
        }
    ];

    // Evaluate "Best Deal" algorithm
    // Weights: 60% Price, 30% Delivery Speed, 10% Ratings
    results.forEach(res => {
        let priceScore = (100000 / res.price) * 0.6;
        let deliveryScore = (5 / Math.max(res.deliveryDays, 1)) * 0.3;
        let ratingScore = (res.rating / 5) * 0.1;
        res.score = priceScore + deliveryScore + ratingScore;
    });

    // Sort by best highest score
    results.sort((a, b) => b.score - a.score);

    // Flag the absolute best calculated deal explicitly
    results[0].bestChoice = true;

    return results;
};

module.exports = { searchProducts };
