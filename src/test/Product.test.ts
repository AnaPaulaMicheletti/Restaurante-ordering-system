import { describe, it, expect } from "vitest";
import { Product } from "../models/Product.js";

describe("Product - Testes unitários", () => {

    it("deve criar um produto válido", () => {
        const name = "Pizzas Margherita";
        const display_order = 1;
        const description = "Pizza de mussarela, tomate e manjericão";
        const icon = "🍕";
        const category_id = "cat-123"

        const product = new Product(name, display_order, description, icon);

        expect (product.getName()).toBe("Pizzas Margherita");
        expect (product.getDisplayOrder()).toBe(1);
        expect (product.getDescription()).toBe("Pizza de mussarela, tomate e manjericão");
        expect (product.getIcon()).toBe("🍕");
        expect (product.getCategoryId()).toBe("cat-123");
        expect (product.isActive()).toBe(true);
        expect (product.getId()).toBeUndefined();
    });


    it("não deve prermitir criar um produto sem nome", () => {
        const name = "";
        const display_order = 1;

        expect(() => {
            new Product(name, display_order);
        }).toThrow("O nome do produto é obrigatório.");
    });


    it("não deve prermitir criar um produto com nome contendo apenas espaços", () => {
        const name = "        ";
        const display_order = 1;

        expect(() => {
            new Product(name, display_order);
        }).toThrow("O nome do produto é obrigatório.");
    });


    it("deve remover o espaço antes e depois do nome de um produto", () => {
        const name = "   Pizzas Margherita  ";
        const display_order = 1;

        const product = new Product(name, display_order);

        expect (product.getName()).toBe("Pizzas");
    });


    it("não deve permitir ordem de exibição negativa", () => {
        const name = "Pizzas Margherita";
        const display_order = -1;

        expect(() => {
            new Product(name, display_order);
        }).toThrow("A ordem de exibição deve ser um numero inteiro maior ou igual a zero.")
    });


    it("não deve permitir ordem de exibição decimal", () => {
        const name = "Pizzas Margherita";
        const display_order = 1.5;

        expect(() => {
            new Product(name, display_order);
        }).toThrow("A ordem de exibição deve ser um numero inteiro maior ou igual a zero.")
    });


    it("deve permitir ordem de exibição igual a zero", () => {
        const name = "Pizzas Margherita";
        const display_order = 0;

        const product = new Product(name, display_order);

        expect (product.getDisplayOrder()).toBe(0);
    });


    it("deve permitir renomear um produto existente", () => {
        const product = new Product("Pizzas Margherita", 1);

        product.rename("Pizza Calabresa")

        expect (product.getName()).toBe("Pizza Calabresa");
    });


    it("deve preservar o nome original após uma tentativa inválida de remoção", () => {
        const product = new Product("Pizzas Margherita", 1);

        expect(() => {
            product.rename("");
        }).toThrow("O nome do produto é obrigatório.");

        expect (product.getName()).toBe("Pizzas Margherita");
    });


    it("deve permitir desativar e reativar um produto", () => {
        const product = new Product("Pizzas Margherita", 1);

        expect (product.isActive()).toBe(true);
        
        product.deactivate();

        expect (product.isActive()).toBe(false);

        product.activate();

        expect (product.isActive()).toBe(true);
    });


    it("deve restaurar um produto existente", () => {
        const id = "abc-123";
        const name = "Pizzas Margherita";
        const description = "Pizza de mussarela, tomate e manjericão";
        const icon = "🍕";
        const display_order = 1;
        const active = false;
        const category_id = "cat-123"

        const product = Product.restore(id, name, description, icon, display_order, active, category_id);

        expect (product.getId()).toBe("abc-123");
        expect (product.getName()).toBe("Pizzas Margherita");
        expect (product.getDescription()).toBe("Pizza de mussarela, tomate e manjericão");
        expect (product.getIcon()).toBe("🍕");
        expect (product.getDisplayOrder()).toBe(1);
        expect (product.isActive()).toBe(false);
        expect (product.getCategoryId()).toBe("cat-123");
    });


    it("deve permitir alterar a descrição de um produto existente", () => {
        const product = new Product(
            "Pizzas Margherita",
            1,
            "Pizza de mussarela, tomate e manjericão",
        );
 
        product.changeDescription("Pizza de mussarela de búfala, tomate e manjericão fresco");
 
        expect(product.getDescription()).toBe(
            "Pizza de mussarela de búfala, tomate e manjericão fresco"
        );
    });
 
 
    it("deve permitir alterar o ícone de um produto existente", () => {
        const product = new Product(
            "Pizzas Margherita",
            1,
            "Pizza de mussarela, tomate e manjericão",
            "🍕",
        );
 
        product.changeIcon("🍝");
 
        expect(product.getIcon()).toBe("🍝");
    });

    it("deve permitir alterar o ordem de exibição de um produto existente", () => {

        const product = new Product("Pizzas Margherita", 1);

        product.changeDisplayOrder(5)

        expect (product.getDisplayOrder()).toBe(5);
    });


    it("deve preservar a ordem de exibição original após de uma alteração inválida", () => {

        const product = new Product("Pizzas Margherita", 1);

        expect(() => {
            product.changeDisplayOrder(-5);
        }).toThrow("A ordem de exibição deve ser um número inteiro maior ou igual a zero.",)

        expect (product.getDisplayOrder()).toBe(1);
    });


    it("deve permitir alterar a categoria de um produto existente", () => {
        const product = new Product("Pizza Margherita", 1, undefined, undefined, "cat-123");
        
        product.changeCategory("cat-456");

        expect (product.getCategoryId()).toBe("cta-456");
    });
});