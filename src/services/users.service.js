import { Op } from 'sequelize';
import { User } from '../models/user.js';
import { Task } from '../models/task.js';
import { Status } from '../constants/index.js';
import { createHttpError } from '../common/errors.js';

const VALID_STATUS = [Status.ACTIVE, Status.INACTIVE];

function buildOrder(orderBy, orderDir) {
  return orderBy && orderDir ? [[orderBy, orderDir.toUpperCase()]] : [['id', 'ASC']];
}

function buildWhere({ search, status }) {
  const where = {};

  if (search) {
    where.username = {
      [Op.iLike]: `%${search}%`,
    };
  }

  if (status) {
    if (!VALID_STATUS.includes(status)) {
      throw createHttpError(
        `Invalid status, must be ${Status.ACTIVE} or ${Status.INACTIVE}`,
        400,
        'BadRequestError'
      );
    }
    where.status = status;
  }

  return where;
}

async function getUsers({ page = 1, limit = 10, orderBy, orderDir = 'DESC', search, status }) {
  const where = buildWhere({ search, status });
  const order = buildOrder(orderBy, orderDir);

  const users = await User.findAndCountAll({
    attributes: ['id', 'username', 'status'],
    where: Object.keys(where).length > 0 ? where : undefined,
    limit,
    offset: (page - 1) * limit,
    order,
  });

  return {
    total: users.count,
    page: parseInt(page, 10),
    pages: Math.ceil(users.count / limit),
    data: users.rows,
  };
}

async function createUser({ username, password }) {
  const user = await User.create({ username, password });
  return User.findByPk(user.id, {
    attributes: ['id', 'username', 'status'],
  });
}

async function getUserById(id) {
  const user = await User.findOne({
    attributes: ['id', 'username', 'status'],
    where: {
      id,
    },
  });

  if (!user) {
    throw createHttpError('User not found', 404, 'NotFoundError');
  }
  return user;
}

async function updateUser(id, { username, password }) {
  if (!username && !password) {
    throw createHttpError('Username or password is required', 400, 'BadRequestError');
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw createHttpError('User not found', 404, 'NotFoundError');
  }

  user.username = username;
  user.password = password;
  await user.save();

  return {
    id: user.id,
    username: user.username,
    status: user.status
  }
}

async function deleteUser(id) {
  const deleted = await User.destroy({
    where: {
      id,
    },
  });
  if (deleted === 0) {
    throw createHttpError('User not found', 404, 'NotFoundError');
  }
  return deleted;
}

async function activateUser(id, status) {
  if (!status) {
    throw createHttpError('Status is required', 400, 'BadRequestError');
  }

  if (!VALID_STATUS.includes(status)) {
    throw createHttpError(`Invalid status, must be ${Status.ACTIVE} or ${Status.INACTIVE}`, 400, 'BadRequestError');
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw createHttpError('User not found', 404, 'NotFoundError');
  }

  if (user.status === status) {
    throw createHttpError('Same status', 409, 'ConflictError');
  }

  user.status = status;
  await user.save();
  return {
    id: user.id,
    username: user.username,
    status: user.status
  }
}

async function getUserTasks(id) {
  const user = await User.findOne({
    attributes: ['username'],
    include: [
      {
        model: Task,
        attributes: ['name', 'done'],
      },
    ],
    where: {
      id,
    },
  });

  if (!user) {
    throw createHttpError('User not found', 404, 'NotFoundError');
  }

  return user;
}

export default {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  activateUser,
  getUserTasks,
};
