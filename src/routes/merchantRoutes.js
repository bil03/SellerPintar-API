const express = require('express');
const { create, get } = require('../controller/MerchantController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/', authMiddleware, get);

module.exports = router;
