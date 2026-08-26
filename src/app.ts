import express from "express";
import {randomUUID} from "node:crypto";

const app = express();

app.use(express.json());


const pizzaCategoryId = randomUUID();
const drinkCategoryId = randomUUID();

app.get("/", (req, res) => {
    res.status(200).json({
        mensage: "Restaurante Ordering System API",
        version: "1.0.0"
    })
})
const categories = [
  {
    id: pizzaCategoryId,
    "name": "Pizzas Tradicionais",
    "description": "Sabores clássicos preparados com ingredientes frescos e massa artesanal."
  },
  {
    id: drinkCategoryId,
    "name": "Pizzas Especiais",
    "description": "Combinações exclusivas da casa para quem busca sabores diferenciados."
  },
  
];

const products = [
  {
    "id": randomUUID(),
    "categoryId": 1,
    "name": "Margherita",
    "description": "Molho de tomate, muçarela, tomate fresco e manjericão.",
    "price": 39.90
  },
  {
    "id": randomUUID(),
    "categoryId": 1,
    "name": "Calabresa",
    "description": "Molho de tomate, muçarela, calabresa fatiada e cebola.",
    "price": 42.90
  },
  {
    "id": randomUUID(),
    "categoryId": 2,
    "name": "Quatro Queijos",
    "description": "Muçarela, provolone, parmesão e gorgonzola.",
    "price": 49.90
  },
  {
    "id": randomUUID(),
    "categoryId": 2,
    "name": "Frango com Catupiry",
    "description": "Frango desfiado, muçarela e catupiry cremoso.",
    "price": 47.90
  },
  {
    "id": randomUUID(),
    "categoryId": 3,
    "name": "Chocolate com Morango",
    "description": "Chocolate cremoso, morangos frescos e leite condensado.",
    "price": 44.90
  },
  {
    "id": randomUUID(),
    "categoryId": 3,
    "name": "Banana com Canela",
    "description": "Banana, açúcar, canela e doce de leite.",
    "price": 41.90
  }
];

app.get("/categories", (req, res) => {
    res.status(200).json(categories);
})

app.get("/categories/:id", (req, res) => {
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





app.get("/products", (req, res) => {
    res.status(200).json(products);
})

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

app.delete("/products/id:", (req, res) => => {
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

export default app;