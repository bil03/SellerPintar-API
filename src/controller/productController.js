const { createProductWithVariants, getProductsByMerchant, updateProductWithVariants } = require('../services/productService');
const generateVariants = require('../utils/variantGenerator');

const create = async (req, res) => {
  const { merchantId } = req.params;
  const { name, colors = [], sizes = [] } = req.body;

  try {
    const variants = generateVariants(name, colors, sizes);

    const product = await createProductWithVariants({
      name,
      merchantId,
      variants,
    });

    return res.status(201).json({ message: 'Product created', data: product });
  } catch (error) {
    console.error('Error in create controller:', error);

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';

    return res.status(statusCode).json({ error: message });
  }
};

const getByMerchant = async (req, res) => {
  const { merchantId } = req.params;

  try {
    const products = await getProductsByMerchant(merchantId);
    return res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const update = async (req, res) => {
  const { merchantId, productId } = req.params;
  const { name, colors = [], sizes = [] } = req.body;

  try {
    const updatedProduct = await updateProductWithVariants({
      productId,
      merchantId,
      name,
      colors,
      sizes,
    });

    return res.status(200).json({ message: 'Product updated', data: updatedProduct });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = {
  create,
  getByMerchant,
  update,
};
