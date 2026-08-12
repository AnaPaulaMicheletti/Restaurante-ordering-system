import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        mensage: "Restaurante Ordering System API",
        version: "1.0.0"
    })
})

app.get("/categories", (req, res) => {
    res.status(200).json({
            mensage: "Lista de categorias"
        })
})

app.get("/products", (req, res) => {
    res.status(200).json({
            mensage: "RLista de produtos"
        })
})

export default app;