import ProductSchema from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req,res)=>{
    try {
        // the find method in mongoose helps in retrieving all the data from database by passing an object as an argument to match the data
        // and {} is passed as argument which means its' empty object which means no criteria is applied to find documents/data and it will return all the data
        const products=await ProductSchema.find({});
        res.status(200).json({success:true, data:products})
    } catch (error) {
        console.log("error in getting the products: " + error);
        res.status(500).json({success:false, message:`server error: ${error}`});
    }
}

export const createProduct=async (req, res)=>{
    const product = req.body; // user will send this data

    // check if all fields are filled or not
    if(!product.name || !product.price || !product.image){
        // 400 means that server was not able to complete the request due to client error and 
        // status function of the response object will set the status code to 400 and then 
        // json method will send the response as an object by parsing json as input in the function
        return res.status(400).json({success:false, message: "All data fields are not filled"})
    }

    //now create a product by passing the user data to the product model created in model file
    const newProduct = new ProductSchema(product);

    //saving the product to the database
    try{
        // save product to the database
        await newProduct.save();
        // 201 means that the request has been fulfilled and has resulted in one or more new resources being created
        return res.status(201).json({success:true, message:"Product Created", data:newProduct});
    }catch(err){
        console.log("error in creating the product:" + err );
        res.status(500).json({success:false, message:`server error: ${err}`});
    }
}


export const deleteProduct=async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Product Id Not Found"});
    }
    try {
        // here the async function will wait till the delete function (which is a promise) is completed/resolved
        // here ProductSchema is the mongoose model from where to delete the data
        await ProductSchema.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" });
    } catch (error) {
        console.log("error in deleting the product: " + error);
        res.status(500).json({ success: false, message: `Product Id not found: ${error}` });
    }
}

export const updateProduct=async (req,res)=>{
    const {id}=req.params;
    const product=req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Product Id Not Found"});
    }
    
    try {
        const productUpdate=await ProductSchema.findByIdAndUpdate(id, product,{new:true});
        res.status(200).json({success:true, message:"Product updated", data:productUpdate});
    } catch (error) {
        console.log("error in updating the product: " + error);
        res.status(500).json({success:false, message:`server error: ${error}`});
    }

}