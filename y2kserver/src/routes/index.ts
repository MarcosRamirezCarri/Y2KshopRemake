import { Router } from 'express';
import authenticateToken from './middleware/auth';
import postInCart from './cartRoutes/postCartItem';
import deleteCartItem from './cartRoutes/deleteCartItem';
import postProduct from './productRoutes/postProduct';
import postUser from './userRoutes/postUser';
import loginUser from './userRoutes/loginUser';
import getUsers from './userRoutes/getUsers';
import getProducts from './productRoutes/getProducts';
import searchByName from './productRoutes/searchByName';
import searchById from './productRoutes/searchById';

const router = Router();

router.post('/product', authenticateToken, postProduct);

router.post('/login', loginUser)

router.post('/register', postUser);

router.post('/cart/:userId/add', postInCart)

router.get('/product', getProducts);

router.get('/user', getUsers);

router.get('/product/search', searchByName)

router.get('/product/:idProduct', searchById) 

router.delete('/cart/:userId/remove/:idProduct', deleteCartItem)

export default router