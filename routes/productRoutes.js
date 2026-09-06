import express from "express";
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    updateProductController,
    productListController,
    productCountController,
    productCategoryController,
    PaymentController,
} from "../controllers/productControllers.js";
import { isAdmin, requireLogIn } from "./../middlewares/authorizationMiddleware";
import formidable from "express-formidable";

const router = express.Router();

//routes
// it takes form type data
router.post(
    "/create-product",
    requireLogIn,
    isAdmin,
    // added as middleware fr saving images
    formidable(),
    createProductController
);
//routes
router.put(
    "/update-product/:pid",
    requireLogIn,
    isAdmin,
    formidable(),
    updateProductController
);

//get all products
router.get("/get-product", getProductController);

//single product based on slug
router.get("/get-product/:slug", getSingleProductController);

//get photo on based of prdt id
router.get("/product-photo/:pid", productPhotoController);

//delete product by id
router.delete("/delete-product/:pid", deleteProductController);


// for pagnination
//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);


//category wise product
router.get("/product-category/:slug", productCategoryController);


//payments
router.post("/payment", requireLogIn, PaymentController);

export default router;