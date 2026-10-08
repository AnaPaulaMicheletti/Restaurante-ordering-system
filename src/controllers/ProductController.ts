import type { Request, Response } from "express";
import { Product } from "../models/Product.js";
import ProductRepository from "../repositories/ProductRepository.js";

async function getAll(req: Request, res: Response){
    try {
        try{
            const products = await ProductRepository.findAll();
            res.status(200).json(products);
        
          }catch(error){
            console.log("Erro ao buscar produto:", error);

            res.status(404).json({
              message: "Erro ao buscar produto.",
            });
        }
    }catch (error){}
}

async function getById(req: Request <{id: string}>, res: Response){
    const {id} = req.params;

    if(!id){
        return res.status(400).json({
            message: "ID do Produto não informado.",
        });
    }
    try{
        const product = await ProductRepository.findById(id);
        res.status(200).json({
          name: product.getName(),
          description: product.getDescription(),
          icon: product.getIcon(),
          display_order: product.getDisplayOrder(),
          category_id: product.getCategoryId(),
          active: product.isActive(),
        });

    }catch (error){
        console.log("Erro ao buscar produto: ", error);

        res.status(404).json({
      message: "Erro ao buscar produto.",
    });
  }
}

async function create(req: Request, res: Response){
  const { name, display_order, description, icon, category_id} = req.body;

    try{
        const product = new Product(name, display_order, description, icon, category_id);

        const createdProduct = await ProductRepository.create(req.body);
        res.status(201).json(createdProduct);

  }catch (error){
    console.log("Erro ao criar produto: ", error);

    res.status(500).json({
      message: "Erro ao criar produto.",
    });
  }
}

async function update(req: Request <{id: string}>, res: Response){
    const {id} = req.params;
    const {name, display_order, description, icon, category_id} = req.body;

    if(!id){
        return res.status(400).json({
            message: "ID dp Produto não informado.",
        });
    }

    try{
      const product = await ProductRepository.findById(id);

      if(category_id !== undefined){
        product.changeCategory(category_id);
      }

      const updateProduct = await ProductRepository.update(product);

      res.status(200).json(updateProduct);

  }catch (error){
    console.log("Erro ao buscar produto: ", error);

    res.status(500).json({
      message: "Erro ao buscar produto.",
    });
  }
}

async function remove(req: Request <{id: string}>, res: Response){
    const {id} = req.params

    if(!id){
        return res.status(400).json({
            message: "ID do Produto não informado.",
        });
    }
    
    try{
        const product = await ProductRepository.remove(id);
        res.status(200).json({
      message: "Produto removido com sucesso.",
    });

  }catch (error){
    console.log("Erro ao remover produto: ", error);

    res.status(500).json({
      message: "Produto nao encontrada.",
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
        const products = await ProductRepository.findByKeyword(keyword);
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
};