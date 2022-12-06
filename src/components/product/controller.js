import { PrismaClient } from "@prisma/client";

//We create a instance of PrismaClient
const prisma = new PrismaClient();
//We define a asynchronous function to send queries to DB

//CREATE
export const create = async(req, res) => {    
    try{
    const { name,
            description,
            expirationDate,
            isNew,
            stock
             } = req.body;
        // Validate user input
    if (!(name && description && expirationDate && isNew && stock)) {
    return res.status(400).send("All input is required");
    }
    const createProduct = await prisma.product.create({
        data:{
            name,     
            description,    
            expirationDate: new Date(expirationDate),
            isNew,     
            stock,   
 
        }
    })
        // return new character
    return res.status(201).json({
        data: createProduct,
        info: "Product created",
    });
    } catch (err) {
        console.log(err);
    }
}

//READ ALL and Search
export const readAll = async(req, res) =>{
    try{

    
        const findAll = await prisma.product.findMany({});

        return res.json(findAll);
     
    }catch (err) {
        return res.json({
            error: err.message
        })
      }
}

///Detalles
export const readOne = async(req, res) =>{
    try{
        const { id } = req.params
        const findOne = await prisma.product.findUnique({
            where: {
                id: Number(id),
            }
        })
        return res.json(findOne)
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Can't read that product",
            error: err.message
        })
      }
}



//UPDATE
export const update = async(req, res) =>{
    try{
        const { id } = req.params
        const { name,
            description,
            expirationDate,
            isNew,
            stock
             } = req.body;
        const updateProduct = await prisma.product.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name, 
                description: description,
                expirationDate: new Date(expirationDate),
                isNew: isNew,
                stock: stock 
            },
        })
        return res.json(updateProduct)
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Can't update product",
            error: err.message
        })
      }
}

//DELETE
export const deleteOne = async(req, res) =>{
    try{
        const { id } = req.params
        const deleteProduct = await prisma.product.delete({
            where: {
                id: Number(id),
            },
        })
        return res.json({
            info:"Product deleted",
            data: deleteProduct
            
        })
    }catch (err) {
        console.log(err.message);
        return res.json({
            info: "Product already deleted",
        })
      }
}
