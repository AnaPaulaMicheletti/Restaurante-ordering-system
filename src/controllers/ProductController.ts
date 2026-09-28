import type {Request, Response} from "express";
import Product from "../models/Product.js";

async function getAll(req: Request, res: Response){
    try{
        try{
            const products = await Product.findAll();
            res.status(200).json(products);

        }catch (error){
            console.log("Erro ao buscar produtos: ", error);

            res.status(500).json({
        message: "Erro ao buscar produtos.",
        });
    }
    }catch (error){}
}

async function getById(req: Request <{id:string}>, res: Response){
    const {id} = req.params;

    if(!id){
        return res.status(400).json({
            message: "ID Produto não informado.",
        });
    }
    try{
        const products = await Product.findById(id);
        res.status(200).json(products);
    
    }catch (error){
        console.log("Erro ao buscar produtos: ", error);

        res.status(500).json({
        message: "Erro ao buscar produtos.",
        });
    }
}

async function create(req: Request, res: Response){
    try{
        const products = await Product.create(req.body);
        res.status(201).json(products);
    
    }catch (error){
        console.log("Erro ao criar produtos: ", error);
        
        res.status(500).json({
            message: "Erro ao criar produtos.",
        });
    } 
}

async function update(req: Request <{id: string}>, res: Response){
    const {id} = req.params

    if(!id){
        return res.status(400).json({
            message: "ID de Produtos não informado.",
        });
    }
    try{
        const products = await Product.update(id, req.body);
        res.status(200).json(products);
    
    }catch (error){
        console.log("Erro aos buscar categoria:", error);

        res.status(500).json({
            message: "Erro ao buscar produtos.",
        });
    }
}

async function remove(req: Request <{id: string}>, res: Response){
    const {id} = req.params

    if(!id){
        return res.status(400).json({
            message: "ID de Produtos não informado.",
        });
    }

    try{
        const products = await Product.remove(id);
        res.status(200).json({
            message: "Produto removido com sucesso.",
        });
    
    }catch (error){
        console.log("Erro ao remover produto: ", error);
        
        res.status(500).json({
            message: "Produto nao encontrado.",
        });
    }
}

async function getByKeyword(req: Request, res: Response){
    const {keyword} = req.params;

    if(!keyword || typeof keyword != "string"){
        return res.status(400).json({
            message: "Palavra-chave não informada",
        });
    }

    try{
        const products = await Product.findByKeyword(keyword);
        res.status(200).json(products);
    
    }catch (error){
        console.log("Erro ao buscar produto: ", error);

        res.status(500).json({
            message: "Erro ao buscar produto.",
        });
    }
}

export default{
    getAll,
    getById,
    create,
    update,
    remove,
    getByKeyword,
}