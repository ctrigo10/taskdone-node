import { Op } from 'sequelize';
import { Task } from '../models/task.js';
import { createHttpError } from '../common/errors.js';

function buildOrder(orderBy, orderDir) {
  return orderBy && orderDir ? [[orderBy, orderDir.toUpperCase()]] : [['id', 'ASC']];
}

function normalizeDone(done) {
  if (done === 'true' || done === true) return true;
  if (done === 'false' || done === false) return false;
  return undefined;
}

async function getTasks({ userId, page = 1, limit = 10, orderBy = 'id', orderDir = 'DESC', search = '', done = null }) {
  const where = { userId };
  const normalizedDone = normalizeDone(done);

  if (search?.trim()) {
    where.name = {
      [Op.iLike]: `%${search.trim()}%`,
    };
  }

  if (normalizedDone !== undefined) {
    where.done = normalizedDone;
  }

  const tasks = await Task.findAndCountAll({
    attributes: ['id', 'name', 'done'],
    where,
    limit,
    offset: (page - 1) * limit,
    order: buildOrder(orderBy, orderDir),
  });

  return {
    total: tasks.count,
    page,
    pages: Math.ceil(tasks.count / limit),
    data: tasks.rows,
  };
}

async function createTask({ userId, name }) {
  if (!name) {
    throw createHttpError('Task name is required', 400, 'BadRequestError');
  }
  return Task.create({ name: name.trim(), userId });
}

async function getTaskById(id, userId) {
  const task = await Task.findOne({
    attributes: ['name', 'done'],
    where: {
      id,
      userId,
    },
  });

  if (!task) {
    throw createHttpError('Task not found', 404, 'NotFoundError');
  }

  return task;
}

async function updateTask(id, userId, name) {
  const [updatedCount] = await Task.update(
    {
      name,
    },
    {
      where: {
        id,
        userId,
      },
    }
  );

  if (updatedCount === 0) {
    throw createHttpError('Task not found', 404, 'NotFoundError');
  }
  return getTaskById(id, userId);
}

async function setTaskDone(id, userId, done) {
  const [updatedCount] = await Task.update(
    {
      done,
    },
    {
      where: {
        id,
        userId,
      },
    }
  );

  if (updatedCount === 0) {
    throw createHttpError('Task not found', 404, 'NotFoundError');
  }
  return getTaskById(id, userId);
}

async function deleteTask(id, userId) {
  const deleted = await Task.destroy({
    where: {
      id,
      userId,
    },
  });
  if (deleted === 0) {
    throw createHttpError('Task not found', 404, 'NotFoundError');
  }
  return deleted;
}

export default {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  setTaskDone,
  deleteTask,
};
