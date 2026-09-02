import express from "express";
import {randomUUID} from "node:crypto";
import supabase from "./config/supabase.js";

const app = express();

app.use(express.json());


app.get("/categories", async (req, res) =>{
  try{
    const categories = await Category.findAll();
    res.status(200).json(categories);

  }catch (error){
    console.log("Erro ao buscar categorias: ", error);

    res.status(500).json({
      message: "Erro ao buscar categorias.",
    });
  }
});

app.post("/categories", async (req, res) => {
  try{
    const categories = await Category.create(req.body);
    res.status(201).json(categories);

  }catch (error){
    console.log("Erro ao criar categorias: ", error);

    res.status(500).json({
      message: "Erro ao criar categorias.",
    });
  }
});

/*app.get("/", (req, res) => {
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
*/



app.get("/products", async (req, res) =>{
  try{
    const categories = await Product.findAll();
    res.status(200).json(products);

  }catch (error){
    console.log("Erro ao buscar categorias: ", error);

    res.status(500).json({
      message: "Erro ao buscar categorias.",
    });
  }
});

app.post("/products", async (req, res) => {
  try{
    const product = await Product.create(req.body);
    res.status(201).json(product);

  }catch (error){
    console.log("Erro ao criar produto: ", error);

    res.status(500).json({
      message: "Erro ao criar produto.",
    });
  }
});

/*
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
*/

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

export default app;