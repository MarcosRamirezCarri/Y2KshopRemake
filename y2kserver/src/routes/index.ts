import { Router } from 'express';
import authenticateToken from './middleware/auth';

import postInCart from './cartRoutes/postCartItem';
import deleteCartItem from './cartRoutes/deleteCartItem';
import getCartItems from './cartRoutes/getCartItems';
import putCartItem from './cartRoutes/putCartItem';
import { addToHistoryItem } from './cartRoutes/addToHisoryItem';

import PostFlyer from './FlyersRoutes/postFlyer';
import getFlyers from './FlyersRoutes/getFlyer';

import postUser from './userRoutes/postUser';
import loginUser from './userRoutes/loginUser';
import getUsers from './userRoutes/getUsers';
import putUser from './userRoutes/putUser';
import getUserFromId from './userRoutes/getUserFromId';
import { checkEmail } from './userRoutes/checkEmail';

import postProduct from './productRoutes/postProduct';
import deleteProduct from './productRoutes/deleteProducts';
import getProducts from './productRoutes/getProducts';
import updateProduct from './productRoutes/putProduct';
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

router.get('/user/checkemail/:emailuser', checkEmail)

router.get('/product/search', searchByName);

router.get('/product/:idProduct', searchById);

router.get('/cart/:userId', getCartItems);

router.get('/flyer', getFlyers);

router.put('/cart/:userId/modify/:itemId', putCartItem);

router.put('/product/modify', updateProduct);

router.put('/cart/:userId/:itemId', addToHistoryItem);

router.put('/user', putUser);

router.delete('/cart/:userId/remove/:itemId', deleteCartItem);

router.delete('/product/delete/:idProduct', deleteProduct)

export default router