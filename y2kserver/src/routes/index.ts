import { Router } from 'express';
import postProduct from './productRoutes/postProduct';
import postUser from './userRoutes/postUser';
import getUsers from './userRoutes/getUsers';
import getProducts from './productRoutes/getProducts';

const router = Router();

router.post('/product', postProduct);

router.post('/user', postUser);

router.get('/product', getProducts);

router.get('/user', getUsers);

export default router