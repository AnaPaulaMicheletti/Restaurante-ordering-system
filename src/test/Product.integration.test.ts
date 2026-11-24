import { randomUUID } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";
import supabase from "../config/supabase.js";

describe("Product - Teste de integração", () => {
    const testNames: string[] = [];
    const categoryNames: string[] = [];

    async function createCategory(){
        const name = `Categoria test ${randomUUID()}`;

        categoryNames.push(name);

        const response = await request(app).post("/categories").send({
            name,
            display_order: 1,
            descripition: "Categoria criada pelo teste de produto",
            icon: "🍕",
        });

        expect(response.status).toBe(201);

        return response.body.id as string;
    }

    function makeProductData(category_id: string){
        const name = `Teste integração ${randomUUID()}`;

        testNames.push(name);

        return {
            name,
            display_order: 1,
            description: "Produto criado pelo teste de integração",
            icon: "🍕",
            category_id,
        };
    }

    async function createProduct(){
        const category_id = await createCategory();
        const data = makeProductData(category_id);

        const response = await request(app).post("/products").send(data);

        expect(response.status).toBe(201);
        expect(response.body.id).toEqual(expect.any(String));

        return{
            id: response.body.id as string,
            data,
        };
    }

    afterEach(async () => {
        const names = testNames.slice(0);
        const cNames = categoryNames.slice(0);

        if(names.length > 0){
            const {error} = await supabase
            .from ("products")
            .delete()
            .in("name", names);

            if(error){
                throw new Error (`Falha ao limpar produtos do teste: ${error.message}`);
            }
        }

        if(cNames.length > 0){
            const {error} = await supabase
            .from ("categories")
            .delete()
            .in("name", cNames);
            
            if(error){
                throw new Error (`Falha ao limpar categorias do teste: ${error.message}`);
            }
        }
        
    }, 20_000);

    it("deve criar um produto válido", async () => {
            const category_id = await createCategory();
            const data = makeProductData(category_id);
    
            const response = await request(app).post("/products").send(data);
    
            expect(response.status).toBe(201);
            expect(response.body.id).toEqual(expect.any(String));
            expect(response.body).toMatchObject({
                ...data,
                active: true,
            });
        }, 20_000);

    it("deve listar os produtos inclusive o produto criado", async () => {
        const { id, data } = await createProduct();

        const response = await request(app).get("/products");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id,
              name: data.name,
        }),
      ]),
    );
  }, 20_000);

    it("deve consultar um produto existente pelo ID", async () => {
            const {id, data} = await createProduct();
    
            const response = await request(app).get(`/products/${id}`);
    
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                id,
                ...data,
                active: true,
            });
    },20_000);

    it("deve buscar um produto por palavra-chave", async () => {
        const { id, data } = await createProduct();

        const response = await request(app).get(
          `/products/search/${encodeURIComponent(data.name)}`,
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id,
              name: data.name,
            }),
          ]),
        );
    }, 20_000);

    it("deve remover um produto existente", async () => {
            const {id} = await createProduct();
    
            const response = await request(app).delete(`/products/${id}`);
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual({message: "Produto removido com sucesso."});
    },20_000);

    it("deve atualizar um produto existente", async () => {
            const {id, data} = await createProduct();
    
            const updateData ={
                ...makeProductData(data.category_id),
                description: "Descrição atualizada pelo teste.",
                icon: "🥤",
                display_order: 5,
                active: false,
            };

            const response = await request(app)
            .put(`/products/${id}`)
            .send(updateData);
    
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                id,
                ...updateData,
            }); 
    },20_000);
});