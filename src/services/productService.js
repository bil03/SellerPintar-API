const prisma = require('../prismaClient');
const generateVariants = require('../utils/variantGenerator');

const createProductWithVariants = async ({ name, merchantId, variants }) => {
  const merchant = await prisma.merchant.findUnique({
    where: { id: merchantId },
  });

  if (!merchant) {
    const error = new Error('Merchant not found');
    error.statusCode = 404;
    throw error;
  }

  return prisma.product.create({
    data: {
      name,
      merchantId,
      variants: {
        create: variants,
      },
    },
    include: {
      variants: true,
    },
  });
};

const getProductsByMerchant = async (merchantId) => {
  const merchant = await prisma.merchant.findUnique({
    where: { id: merchantId },
  });

  if (!merchant) {
    return 'Merchant not found';
  }

  const products = await prisma.product.findMany({
    where: { merchantId },
    include: {
      variants: true,
    },
  });

  return products;
};

const updateProductWithVariants = async ({ productId, name, merchantId, colors = [], sizes = [] }) => {
  
  const merchant = await prisma.merchant.findUnique({
    where: { id: merchantId },
  });

  if (!merchant) {
    const error = new Error('Merchant not found');
    error.statusCode = 404;
    throw error;
  }

  
  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      merchantId,
    },
    include: { variants: true },
  });

  if (!existingProduct) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  
  if (name && name !== existingProduct.name) {
    await prisma.product.update({
      where: { id: productId },
      data: { name },
    });
  }

  
  const newVariants = colors.length && sizes.length ? generateVariants(name, colors, sizes) : [];

  
  for (const variant of newVariants) {
    const exists = await prisma.productVariant.findFirst({
      where: {
        sku: variant.sku,
        productId,
      },
    });

    if (!exists) {
      await prisma.productVariant.create({
        data: {
          ...variant,
          productId,
        },
      });
    }
  }

  
  return prisma.product.findUnique({
    where: { id: productId },
    include: { variants: true },
  });
};

module.exports = {
  createProductWithVariants,
  getProductsByMerchant,
  updateProductWithVariants,
};
