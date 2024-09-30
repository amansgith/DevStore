import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/product.controller.js";

const router=express.Router();

// retrieving the products in json format using  get API endpoint
router.get('/', getProducts)

//POST API endpoint to CREATE A PRODUCT AND STORE IT IN DATABASE
router.post('/', createProduct);

// delete api for deleting a product by its ID
router.delete('/:id', deleteProduct);

// this method will update the data/document also there is findbyIdAndUpdate method of mongoose which works on Product model imported above and then we pass the product object to it with the updated values
router.put('/:id', updateProduct);

export default router;