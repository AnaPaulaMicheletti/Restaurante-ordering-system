import type { Request, Response } from "express";
import { Product } from "../models/Product.js";
import ProductRepository from "../repositories/ProductRepository.js";
import { ValidationError } from "../errors/Validation.Error.js";
import { NotFoundError } from "../errors/NotFoundError.js";

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

        if(error instanceof ValidationError){
            return res.status(404).json({
            message: error.message,
          });
        }

        res.status(404).json({
      message: "Erro interno ao buscar produto.",
    });
  }
}

async function create(req: Request, res: Response){
  const { name, display_order, description, icon, category_id} = req.body;

    try{
        const product = new Product(name, display_order, description, icon, category_id);

        const createdProduct = await ProductRepository.create(product);
        res.status(201).json(createdProduct);

  }catch (error){
    if(error instanceof ValidationError){
      return res.status(500).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Erro interno ao criar produto.",
    });
  }
}

async function update(req: Request <{id: string}>, res: Response){
    const {id} = req.params;
    const {name, display_order, description, icon, category_id, active} = req.body;

    if(!id){
        return res.status(400).json({
            message: "ID dp Produto não informado.",
        });
    }

    try{
      const product = await ProductRepository.findById(id);

      //validação
      if(name !== undefined){
        product.rename(name);
      }

      if(description != undefined){
        product.changeDescription(description);
      }

      if(icon != undefined){
        product.changeIcon(icon);
      }

      if(display_order != undefined){
        product.changeDisplayOrder(display_order);
      }

      if(active === true){
        product.activate();
      }

      if(active === false){
        product.deactivate();
      }

      if(category_id !== undefined){
        product.changeCategory(category_id);
      }

      const updateProduct = await ProductRepository.update(product);

      res.status(200).json(updateProduct);

  }catch (error){
    console.log("Erro ao buscar produto: ", error);

    if(error instanceof ValidationError){
        res.status(400).json({
        message: error.message,
      });
    }

    if(error instanceof NotFoundError){
      res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Erro interno ao buscar produto.",
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