import { Router } from "express";
import { celebrate } from "celebrate";
import { validateCreatePage, validateGetAllPages, validatePageIdParam, validateUpdatePage } from "../validations/validationsGallery";
import { createPage, deletePage, getAllPage, getPageById, updatePage } from "../controllers/controllersGallery";
import { validateCreateProduct, validateGetAllProduct, validateProductIdParam, validateUpdateProduct } from "../validations/validationsProduct";
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from "../controllers/controllersProduct";
import { upload } from "../middelware/multer";


const router = Router();
//getAll router
router.get('/gallery', celebrate(validateGetAllPages), getAllPage);
router.get('/store', celebrate(validateGetAllProduct), getAllProduct);

//getId router
router.get('/gallery/:pageId', celebrate(validatePageIdParam), getPageById);
router.get('/store/:productId', celebrate(validateProductIdParam), getProductById);

//post create router
router.post('/gallery', upload.single('image'), celebrate(validateCreatePage), createPage);
router.post('/store', upload.array('image', 12), celebrate(validateCreateProduct), createProduct);

//delete router
router.delete('/gallery/:pageId', celebrate(validatePageIdParam), deletePage);
router.delete('/store/:productId', celebrate(validateProductIdParam), deleteProduct);

//patch router
router.patch('/gallery/:pageId', upload.single('image'), celebrate(validateUpdatePage), updatePage);
router.patch('/store/:productId', upload.array('image', 12), celebrate(validateUpdateProduct), updateProduct);

