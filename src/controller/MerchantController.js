const { createMerchant, getMerchantByUser } = require('../services/merchantService');

const create = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;

  try {
    const merchant = await createMerchant(name, userId);
    res.status(201).json({ message: 'Merchant created', merchant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const get = async (req, res) => {
  const userId = req.user.userId;

  try {
    const merchants = await getMerchantByUser(userId);
    res.json({ merchants });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create, get };
