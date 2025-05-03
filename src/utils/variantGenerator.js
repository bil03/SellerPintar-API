const crypto = require('crypto');

const generateRandomSuffix = (length = 4) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
};

const generateVariants = (productName, colors = [], sizes = []) => {
  const variants = [];

  const baseName = productName.replace(/\s+/g, '').toUpperCase();

  if (colors.length === 0 && sizes.length === 0) {
    const sku = `${baseName}-${generateRandomSuffix()}`;
    variants.push({
      sku,
      color: null,
      size: null,
      stock: 1,
    });
    return variants;
  }

  colors.forEach((color) => {
    sizes.forEach((size) => {
      const sku = `${baseName}-${color.toUpperCase()}-${size.toUpperCase()}-${generateRandomSuffix()}`;
      variants.push({
        sku,
        color,
        size,
        stock: 1,
      });
    });
  });

  return variants;
};

module.exports = generateVariants;
