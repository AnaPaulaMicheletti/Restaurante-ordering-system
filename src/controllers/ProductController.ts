import type {Request, Response} from "express";
import Product from "../models/Product.js";

async function getAll(req: Request, res: Response){
    try{
        try{
            const products = await Product.findAll();
            res.status(200).json(products);

        }catch (error){
            console.log("Erro ao buscar categorias: ", error);

            res.status(500).json({
        message: "Erro ao buscar categorias.",
        });
    }
    }catch (error){}
}

export function getById(req: Request <{id:string}>, res: Response){
    const {id} = req.params;

    if(!id){
        return res.status(400).json({
            message: ""
        });
    }
}

export default{
    getAll,
}