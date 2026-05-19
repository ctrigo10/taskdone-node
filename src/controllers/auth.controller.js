import authService from '../services/auth.service.js';

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    return res.json(result);
  } catch (error) {
    next(error);
  }
}
export default { login };
