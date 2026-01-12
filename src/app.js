import express from 'express';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import { authenticateToken } from './middlewares/authenticate.js';
import cors from 'cors';

// Import routes
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import tasksRoutes from './routes/tasks.router.js';

// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.js';

const app = express();
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// Middlwares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (_req, res) => {
  res.send('API funcionando');
});

app.use('/api/login', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/tasks', authenticateToken, tasksRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFound);
app.use(errorHandler);

export default app;
