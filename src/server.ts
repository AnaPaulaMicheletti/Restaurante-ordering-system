// req = requisição   res= resposta

//import http from "node:http";

import app from "./app.js";
const port = 3000;

/*
const routes = {
    "/": {
        menssage: "Restaurante Ordering System API"
    },

    "/categories": {
        mensage: "Lista de Categorias",
    },

    "/products": {
        mensage: "Lista de produtos",
    },
};

const server = http.createServer((req, res) => {
    const response = routes[req.url as keyof typeof routes];
    if (!response) {
        res.writeHead(404,{
        "content-type": "application/json",
        });

        return res.end(
            JSON.stringify({
                menssage: "Rota não encontrada",
            }),
        );
    }

    res.writeHead(200, {
        "content-type": "application/json",
    });

    res. end(JSON.stringify(response));
});
*/

app. listen(port, () => {
    console.log(`Servidor executando em http://localhost:${port}`);
})