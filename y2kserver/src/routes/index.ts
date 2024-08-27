import { Router } from 'express';
import authenticateToken from './middleware/auth';
import postInCart from './cartRoutes/postCartItem';
import deleteCartItem from './cartRoutes/deleteCartItem';
import getCartItems from './cartRoutes/getCartItems';
import putCartItem from './cartRoutes/putCartItem';

import PostFlyer from './FlyersRoutes/postFlyer';
import getFlyers from './FlyersRoutes/getFlyer';

import postUser from './userRoutes/postUser';
import loginUser from './userRoutes/loginUser';
import getUsers from './userRoutes/getUsers';
import getUserFromId from './userRoutes/getUserFromId';

import postProduct from './productRoutes/postProduct';
import getProducts from './productRoutes/getProducts';
import searchByName from './productRoutes/searchByName';
import searchById from './productRoutes/searchById';

const router = Router();

router.post('/product', postProduct);

router.post('/login', loginUser);

router.post('/register', postUser);

router.post('/cart/:userId/add', postInCart);

router.post('/flyer', PostFlyer);

router.get('/product', getProducts);

router.get('/user/:userId', getUserFromId);

router.get('/user', getUsers);

router.get('/product/search', searchByName);

router.get('/product/:idProduct', searchById);

router.get('/cart/:userId', getCartItems);

router.get('/flyer', getFlyers);

router.put('/cart/:userId/modify/:itemId', putCartItem);

router.delete('/cart/:userId/remove/:itemId', deleteCartItem);

export default router