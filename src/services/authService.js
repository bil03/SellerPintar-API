const prisma = require('../prismaClient');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

const registerUser = async ({ name, email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email already in use');

  const hashed = await hashPassword(password);
  return prisma.user.create({
    data: { name, email, password: hashed },
  });
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken({ userId: user.id, email: user.email });
  return { token, user };
};

module.exports = { registerUser, loginUser };
