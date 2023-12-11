const path = require('path');
const express = require('express');
const generalStoreController = require('../controllers/generalStore');
const router = express.Router();

router.post('/add-product', generalStoreController.postAddProduct);
router.get('/add-product', generalStoreController.getAddProduct);
router.get('/get-all-product', generalStoreController.getAllProducts);
router.put('/update-product/:productId', generalStoreController.updateProductQuantity);

module.exports = router;
