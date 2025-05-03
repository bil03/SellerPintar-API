const express = require('express');
const { create, getByMerchant, update} = require('../controller/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:merchantId/products', authMiddleware, create);
router.get('/:merchantId', authMiddleware, getByMerchant);
router.put('/:merchantId/products/:productId', authMiddleware, update);


module.exports = router;
