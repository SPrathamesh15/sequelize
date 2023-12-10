const path = require('path');
const express = require('express');
const reviewController = require('../controllers/review');
const router = express.Router();

router.get('/add-review', reviewController.getAddReview);
router.post('/add-review', reviewController.postAddReview);
router.get('/get-all-reviews', reviewController.getAllReviews);
router.get('/get-reviews-by-company', reviewController.getReviewsByCompany);

module.exports = router;