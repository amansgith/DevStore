// here we will define global state that the whole dom tree componenets can access directly without needing to inherit from parent

import {create} from "zustand"

// this is the inner implementation of setting a state
// here create has a callback function having argument as set while will ste the state and the parenthesis og body is ({}) which means we will return an object
export const useProductStore = create ((set)=>({
    // this array is used to store the states
    products:[],
    // this function is used to change the state or set the state
    setProducts:(products)=>set({products}),
    createProduct: async (newProduct)=>{
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success:false, message:"'Please fill the details complete."}
        }
        const res= await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(newProduct)
        })
        const data=await res.json();
        set((state)=>({products:[...state.products, data.data]}));
        return {success:true, message:"Product created successfully."}
    }
}))

