import express from 'express';
import { getTimeToken, login } from '../controllers/auth.controller.ts';

const routes = express.Router();

routes.post('/login', login );

routes.post('/time', getTimeToken);

export default routes;