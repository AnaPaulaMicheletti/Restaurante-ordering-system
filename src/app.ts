import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

// ==================
// Root
// ==================

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});


// ==================
// Swagger Documentation
// ==================

//arrumar
app.use("/api-docs", swaggerUi.serveFiles(swaggerSpec));
app.get("/api-docs", swaggerUi.setup(swaggerSpec));
app.get("/api-docs/", swaggerUi.setup(swaggerSpec));

// ==================
// Root
// ==================
app.use("/categories", categoryRoutes);

app.use("/products", productRoutes);


export default app;