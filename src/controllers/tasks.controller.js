import tasksService from '../services/tasks.service.js';

async function getTasks(req, res, next) {
  const { userId } = req.user;

  try {
    const tasks = await tasksService.getTasks({
      userId,
      ...req.query
    });
    return res.json(tasks);
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  const { userId } = req.user;
  const { name } = req.body;
  try {
    const task = await tasksService.createTask({ userId, name });
    return res.json(task);
  } catch (error) {
    next(error);
  }
}

async function getTask(req, res, next) {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const task = await tasksService.getTaskById(id, userId);
    return res.json(task);
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  const { id } = req.params;
  const { name } = req.body;
  const { userId } = req.user;
  try {
    const task = await tasksService.updateTask(id, userId, name);
    return res.json(task);
  } catch (error) {
    next(error);
  }
}

async function taskDone(req, res, next) {
  const { id } = req.params;
  const { userId } = req.user;
  const { done } = req.body;
  try {
    const task = await tasksService.setTaskDone(id, userId, done);
    return res.json(task);
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const deleted = await tasksService.deleteTask(id, userId);
    return res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
}

export default {
  getTasks,
  createTask,
  getTask,
  updateTask,
  taskDone,
  deleteTask,
};
