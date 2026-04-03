const { searchProducts } = require('../services/aggregatorEngine');

const getAggregatedSearch = async (req, res, next) => {
    try {
        const query = req.query.q;
        if (!query) {
            res.status(400);
            throw new Error('Search query is required');
        }

        const results = await searchProducts(query);
        res.status(200).json({
            success: true,
            query,
            data: results
        });
    } catch(err) {
        next(err);
    }
}

module.exports = { getAggregatedSearch };
