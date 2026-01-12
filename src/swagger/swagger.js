import { getUsers } from './users/get.js';
import { createUser } from './users/post.js';
import { getUserById } from './users/getById.js';
import { updateUser } from './users/put.js';
import { patchUser } from './users/patch.js';
import { loginUser } from './login/post.js';
import { deleteUser } from './users/delete.js';
import { getTasks } from './tasks/get.js';
import { createTask } from './tasks/post.js';
import { getTaskById } from './tasks/getById.js';
import { updateTask } from './tasks/put.js';
import { patchTask } from './tasks/patch.js';
import { deleteTask } from './tasks/delete.js';

function mergePaths(...pathsList) {
  const merged = {};
  for (const paths of pathsList) {
    for (const url in paths) {
      if (!merged[url]) merged[url] = {};
      // merge de métodos HTTP dentro de la misma URL
      Object.assign(merged[url], paths[url]);
    }
  }
  return merged;
}

export default {
  openapi: '3.0.0',
  info: {
    title: 'API con Express',
    version: '1.0.0',
    description: 'Documentación de la API (Swagger + Express)',
  },
  servers: [{ url: 'http://localhost:3000' }],
  paths: mergePaths(
    getUsers,
    createUser,
    loginUser,
    getUserById,
    updateUser,
    patchUser,
    deleteUser,
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    patchTask,
    deleteTask
  ),
};
