import { ValidationError } from "../errors/Validation.Error.js";

export class Product{
    private id?: string | undefined;
    private name: string;
    private description: string | undefined;
    private icon: string | undefined;
    private display_order: number;
    private category_id: string | undefined;
    private active: boolean;

    constructor(
        name: string,
        display_order: number,
        description?: string,
        icon?: string,
        category_id?: string,
    ){
        this.id = undefined;
        this.name = "";
        this.description = description;
        this.icon = icon;
        this.display_order = 0;
        this.category_id = category_id;
        this.active = true;

        this.rename(name);
        this.changeDisplayOrder(display_order);
    }

    static restore(
    id: string,
    name: string,
    description: string | undefined,
    icon: string | undefined,
    display_order: number,
    active: boolean,
    category_id: string | undefined,
    ): Product{
        const product = new Product(name, display_order, description, icon, category_id);

        product.id = id;
        product.active = active;

        return product;
    }

    public getId(): string | undefined{
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string | undefined{
        return this.description;
    }

    public getIcon(): string | undefined{
        return this.icon;
    }

    public getDisplayOrder(): number{
        return this.display_order;
    }

    public getCategoryId(): string | undefined{
        return this.category_id;
    }

    public isActive(): boolean{
        return this.active;
    }

    //para renomear name
    rename(name: string): void{
        if(typeof name !== "string" || name.trim().length === 0){
            throw new ValidationError ("O nome do produto é obrigatório.");
        }

        this.name = name;
    }


    //para trocar a descrição, icon, pedido
    changeDescription(description: string): void{
        this.description = description;
    }

    changeIcon(icon: string): void{
        this.description = icon;
    }

    changeDisplayOrder(display_order: number): void{
        if(!Number.isInteger(display_order) || display_order < 0){
            throw new ValidationError ("A ordem de exibição deve ser um numero inteiro maior ou igual a zer(0).");
        }

        this.display_order = display_order;
    }

    changeCategory(category_id: string): void{
        this.category_id = category_id;
    }

    

    activate(): void{
        this.active = true;
    }

    deactivate(): void{
        this.active = false;
    }
}

