const prisma = require('../prismaClient');

const createMerchant = async (name, userId) => {
  return prisma.merchant.create({
    data: {
      name,
      userId,
    },
  });
};

const getMerchantByUser = async (userId) => {
  return prisma.merchant.findMany({
    where: { userId },
  });
};

module.exports = {
  createMerchant,
  getMerchantByUser,
};
