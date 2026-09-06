import express from "express";
import { isAdmin, requireLogIn } from "./../middlewares/authorizationMiddleware";
import {
    categoryControlller,
    createCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController,
} from "../controllers/categoryControllers.js";

const router = express.Router();

//routes
// create category
router.post(
    "/create-category",
    requireLogIn,
    isAdmin,
    createCategoryController
);

//update category
router.put(
    "/update-category/:id",
    requireLogIn,
    isAdmin,
    updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
    "/delete-category/:id",
    requireLogIn,
    isAdmin,
    deleteCategoryController
);

export default router;