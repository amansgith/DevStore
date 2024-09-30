import mongoose from "mongoose";

// created a schema for the product data
const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    image:{
        type: String,
        required: true
    },
},{
    timestamps:true
});

// created a model for the product schema
const ProductSchema= mongoose.model('Product', productSchema);

export default ProductSchema;