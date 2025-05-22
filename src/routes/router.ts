import express from 'express';
import { getTimeToken, login } from '../controllers/auth.controller.ts';

const routes = express.Router();

routes.post('/login', login );

routes.get('/time/:userId', getTimeToken);

export default routes;