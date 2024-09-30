import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name:"",
        price:0,
        image:"",
    })
    const toast = useToast()
    const {createProduct}=useProductStore()
    const handleAddProduct = async()=>{
        const {success,message}=await createProduct(newProduct)
        console.log(message);
        
        if(success){
            toast({
                title: 'Account created.',
                description: "Product Created successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
        }else{
            toast({
                title: 'Error',
                description:"Error in product creation",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            setNewProduct({name:"", price:"", image:""})
        }
    }
  return (
    <Container maxW={"container.sm"}>
        <VStack spacing={10}>
            <Heading as={"h1"} size={"3xl"} textAlign={"center"} mt={10}>
                Create New Product
            </Heading>
            <Box w={"6xl"} bg={useColorModeValue("white", "gray.800")}
            p={4} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>
                    <Input placeholder="Product Name"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                    <Input placeholder="Product Price"
                    name="price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                    <Input placeholder="Image URL"
                    name="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    />

                    <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>Add Product</Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
  )
}

export default CreatePage;