import express from 'express';
import cors from 'cors';
import notificationRouter from './routes/notification.routes';
import { setupSwagger } from './docs/swagger';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notificar', notificationRouter);

setupSwagger(app);

export default app;
