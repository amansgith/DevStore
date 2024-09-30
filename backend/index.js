import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import { connDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';

// this is used to log the env files details to terminal
// it returns an object which is having parsed .env file
dotenv.config();

const app= express();

// use function is a middleware to handle the request of creating the object
// express.json() is a method inbuilt in express to handle request with json payload to handle json data in restful apis
app.use(express.json());

const __dirname=path.resolve()
// this will act as middleware to handle all api endpoints and routes
// also we kept all routes in separate file to keep code more clean
//also this route will act as prefix for all endpoints
app.use("/api/products", productRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"frontend/dist/index.html"))
    })
}
const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    connDB();
    console.log(`server started at http://localhost:${PORT}`);
})

