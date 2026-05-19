import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { comparar } from '../common/bcrypt.js';
import config from '../config/env.js';
import { createHttpError } from '../common/errors.js';

async function login(username, password) {
  if (!username || !password) {
    throw createHttpError('Username or password is required', 400, 'BadRequestError');
  }

  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    throw createHttpError('User not found', 403, 'ForbiddenError');
  }

  const isMatch = await comparar(password, user.password);
  if (!isMatch) {
    throw createHttpError('User not found', 403, 'ForbiddenError');
  }

  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
    expiresIn: eval(config.JWT_EXPIRES_SECONDS),
  });

  return { token };
}

export default { login };
