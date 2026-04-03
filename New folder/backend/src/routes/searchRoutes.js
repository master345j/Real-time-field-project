const express = require('express');
const router = express.Router();
const { getAggregatedSearch } = require('../controllers/searchController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getAggregatedSearch);

module.exports = router;
