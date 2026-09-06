// it will contain routes for login /sign up
import express from "express";
import {
    signupController,
    loginController,
    testController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController
} from "../controllers/authorizationControllers.js";
import { isAdmin, requireLogIn } from "../middlewares/authorizationMiddleware";

//router object required for keeping routing of api in separate files
const router = express.Router();

//routing
//signup || METHOD POST
router.post("/signup", signupController);

//login || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireLogIn, isAdmin, testController);

//protected user route auth
//authenticating  normal user 
router.get("/user-auth", requireLogIn, (req, res) => {
    res.status(200).send({ ok: true });
});
//protected admin route auth
//authenticating  admin user 
router.get("/admin-auth", requireLogIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireLogIn, updateProfileController);
//user orders
router.get("/orders", requireLogIn, getOrdersController);

//all orders for admin
router.get("/all-orders", requireLogIn, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requireLogIn,
    isAdmin,
    orderStatusController
);
export default router;