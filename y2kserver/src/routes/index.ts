import { Router } from "express";
import authenticateToken from "./middleware/auth";

import * as cartRoutes from "../routes/cartRoutes/zndexCart";
import * as flyerRoutes from "../routes/FlyersRoutes/zndexFlyer";
import * as productRoutes from "../routes/productRoutes/zndexProducts";
import * as userRoutes from "../routes/userRoutes/zndexUser";

const router = Router();

router.post("/product", productRoutes.postProduct);

router.post("/login", userRoutes.loginUser);

router.post("/register", userRoutes.postUser);

router.post("/cart/:userId/add", cartRoutes.postInCart);

router.post("/flyer", flyerRoutes.PostFlyer);

router.get("/product", productRoutes.getProducts);

router.get("/user/:userId", userRoutes.getUserFromId);

router.get("/user", userRoutes.getUsers);

router.get("/user/checkemail/:emailuser", userRoutes.checkEmail);

router.get("/product/search", productRoutes.searchByName);

router.get("/product/:idProduct", productRoutes.searchById);

router.get("/cart/:userId", cartRoutes.getCartItems);

router.get("/flyer", flyerRoutes.getFlyers);

router.put("/cart/:userId/modify/:itemId", cartRoutes.putCartItem);

router.put("/product/modify", productRoutes.updateProduct);

router.put("/cart/update", cartRoutes.addToHistoryItem);

router.put("/user", userRoutes.putUser);

router.delete("/cart/:userId/remove/:itemId", cartRoutes.deleteCartItem);

router.delete("/product/delete/:idProduct", productRoutes.deleteProduct);

router.delete("/user/delete/:userId", userRoutes.deleteUser);

export default router;
