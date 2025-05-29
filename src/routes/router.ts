import express from 'express';
import { getTimeToken, login, updateTime, getAllUsers} from '../controllers/auth.controller.ts';
import { get } from 'http';


const routes = express.Router();

routes.post('/login', login );//ruta de co

routes.get('/time/:userId', getTimeToken);
routes.put('/updatetime/', updateTime);
routes.get('/user', getAllUsers)

export default routes;