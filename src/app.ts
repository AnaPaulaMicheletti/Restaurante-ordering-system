import express from "express";
import {randomUUID} from "node:crypto";
import supabase from "./config/supabase.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
//omateusrpereira - github

import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

// ==================
// Root
// ==================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Restaurante Ordering System API",
    version: "1.0.0",
  });
});

app.use("/categories", categoryRoutes);

/*app.get("/categories/:id", async (req, res) =>{
  try{
    const categories = await Category.findAll();
    res.status(200).json(categories);

  }catch(error){
    console.log("Erro ao buscar categoria:", error);
    res.status(404).json({
      message: "Erro ao buscar categorias.",
    });
  }
});

app.get("/categories/:id", async (req, res) =>{
  try{
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);

  }catch (error){
    console.log("Erro ao buscar categoria: ", error);

    res.status(500).json({
      message: "Erro ao buscar categoria.",
    });
  }
});

app.post("/categories", async (req, res) => {
  try{
    const category = await Category.create(req.body);
    res.status(201).json(category);

  }catch (error){
    console.log("Erro ao criar categoria: ", error);

    res.status(500).json({
      message: "Erro ao criar categoria.",
    });
  }
});

app.get("/categories/search/:keyword", async (req, res) =>{
  try{
    const category = await Category.findByKeyword(req.params.keyword);
    res.status(200).json(category);

  }catch (error){
    console.log("Erro ao buscar categoria: ", error);

    res.status(500).json({
      message: "Erro ao buscar categoria.",
    });
  }
});

app.put("/categories/:id", async (req, res) =>{
  try{
    const category = await Category.update(req.params.id, req.body);
    res.status(200).json(category);

  }catch (error){
    console.log("Erro ao buscar categoria: ", error);

    res.status(500).json({
      message: "Erro ao buscar categoria.",
    });
  }
});

app.delete("/categories/:id", async (req, res) =>{
  try{
    const category = await Category.remove(req.params.id);
    res.status(200).json({
      message: "Categoria removida com sucesso.",
    });

  }catch (error){
    console.log("Erro ao remover categoria: ", error);

    res.status(500).json({
      message: "Categoria nao encontrada.",
    });
  }
});

//app.get("/", (req, res) => {
    res.status(200).json({
        mensage: "Restaurante Ordering System API",
        version: "1.0.0"
    })
})

app.put("/categories/:id", (req, res) => {
    const category = categories.find((category) => {
        return category.id == req.params.id;
    });

    if(!category){
        return res.status(404).json({
            menssage: "Categoria não encontrada.",
        });
    }
    category.name = req.body.name;
    category.description = req.body.description;

    res.status(200).json(categories);
});

app.delete("/categories/:id", (req, res) => {
  const category = categories.find((category) => {
    return category.id == req.params.id;
  })

  if(!category){
        return res.status(404).json({
            menssage: "Categoria não encontrada.",
        });
    }

    const index = categories.indexOf(category);
    categories.splice(index, 1);

    res.status(200).json({
      menssage: "Categoria removida com sucesso."
    })
})

app.post("/categories", (req, res) => {
    const category = {
      id: randomUUID(),
      ...req.body,
    };

    categories.push(category);

    res.status(201).json(category);
})
//
*/


app.use("/products", productRoutes);

/*
app.get("/products/:id", async (req, res) =>{
  try{
    const products = await Product.findAll();
    res.status(200).json(products);

  }catch (error){
    console.log("Erro ao buscar categorias: ", error);

    res.status(500).json({
      message: "Erro ao buscar categorias.",
    });
  }
});

app.post("/products/:id", async (req, res) => {
  try{
    const products = await Product.create(req.body);
    res.status(201).json(products);

  }catch (error){
    console.log("Erro ao criar produto: ", error);

    res.status(500).json({
      message: "Erro ao criar produto.",
    });
  }
});

app.get("/products/search/:keyword", async (req, res) =>{
  try{
    const products = await Product.findByKeyword(req.params.keyword);
    res.status(200).json(products);

  }catch (error){
    console.log("Erro ao buscar categoria: ", error);
 
    res.status(500).json({
      message: "Erro ao buscar categoria.",
    });
  }
});

app.put("/products/:id", async (req, res) =>{
  try{
    const products = await Product.update(req.params.id, req.body);
    res.status(200).json(products);

  }catch (error){
    console.log("Erro ao buscar producto: ", error);

    res.status(500).json({
      message: "Erro ao buscar produto.",
    });
  }
});

app.delete("/product/:id", async (req, res) =>{
  try{
    const products = await Product.remove(req.params.id);
    res.status(200).json({
      message: "Produto removido com sucesso.",
    });

  }catch (error){
    console.log("Erro ao remover produto: ", error);

    res.status(500).json({
      message: "Produto nao encontrado.",
    });
  }
});

//
app.get("/products/:id", (req, res) => {
    const product = products.find((product) => {
      return product.id == req.params.id;
    });

    if(!product){
        return res.status(404).json({
            menssage: "Produto não encontrado.",
        });
    }

    res.status(200).json(products);
})

app.put("/products/:id", (req, res) => {
    const product = products.find((product) => {
        return product.id == req.params.id;
    });

    if(!product){
        return res.status(404).json({
            menssage: "Categoria não encontrada.",
        });
    }
    product.name = req.body.name;
    product.description = req.body.description;

    res.status(200).json(products);
});

app.post("/products", (req, res) => {
    const product = {
      id: randomUUID(),
      ...req.body,
    };

    product.categoryId = req.body.categoryId;
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;

    res.status(201).json(product);
})

app.delete("/products/id:", (req, res) => {
  const product = products.find((product) => {
  });

  if(!product){
    return res.status(404).json({
            menssage: "Produto não encontrado.",
        });
    }

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.status(200).json({
      menssage: "Produto removido com sucesso."
    })

});
//

app.get("/test-supabase", async (req, res) => {
  const {data, error} = await supabase
  .from("categories")
  .select("*");

  if(error){
    console.log("Erro ao consultar supabase:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao consultar banco de dados",
      error: error.message,
    })
  }

  res.status(200).json({
    success: true,
    message: "Conexão com supabase realizada com sucesso",
    data,
  });
})
*/

export default app;