import { Router } from "express";
import authenticateToken from "./middleware/auth";


import * as cartRoutes from "../routes/cartRoutes/zndexCart";
import * as flyerRoutes from "../routes/FlyersRoutes/zndexFlyer";
import * as productRoutes from "../routes/productRoutes/zndexProducts";
import * as userRoutes from "../routes/userRoutes/zndexUser";

const router = Router();

router.post("/product" , authenticateToken , productRoutes.postProduct);

router.post("/login", userRoutes.loginUser);

router.post("/register", userRoutes.postUser);

router.post("/cart/:userId/add", authenticateToken , cartRoutes.postInCart);

router.post("/flyer", authenticateToken, flyerRoutes.PostFlyer);

router.get("/product", productRoutes.getProducts);

router.get("/user/:userId" , userRoutes.getUserFromId);

router.get("/user", authenticateToken , userRoutes.getUsers);

router.get("/cart", authenticateToken ,  cartRoutes.getAllCarts)

router.get("/user/checkemail/:emailuser", userRoutes.checkEmail);

router.get("/product/search", productRoutes.searchByName);

router.get("/product/:idProduct", productRoutes.searchById);

router.get("/cart/:userId", authenticateToken , cartRoutes.getCartItems);

router.get("/session", userRoutes.verifySession);

router.get("/flyer", flyerRoutes.getFlyers);

router.put("/cart/:userId/modify/:itemId", authenticateToken,  cartRoutes.putCartItem);

router.put("/product/modify", authenticateToken, productRoutes.updateProduct);

router.put("/cart/update", authenticateToken, cartRoutes.addToHistoryItem);

router.put("/user", authenticateToken, userRoutes.putUser);

router.put("/flyer/:id", authenticateToken, flyerRoutes.putFlyer)

router.delete("/flyer/delete/:flyerId", authenticateToken, flyerRoutes.deleteFlyer)

router.delete("/cart/:userId/remove/:itemId",authenticateToken ,cartRoutes.deleteCartItem);

router.delete("/product/delete/:idProduct",authenticateToken ,productRoutes.deleteProduct);

router.delete("/user/delete/:userId", authenticateToken,userRoutes.deleteUser);

export default router;
