import supabase from "../config/supabase.js";
import { Product } from "../models/Product.js";

async function findAll(){
    const{data, error} =  await supabase
    .from("products")
    .select("*");

    if(error){
        throw error;
    }
    return data;
}

async function findById(id: string): Promise<Product> {
    const{data, error} =  await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

    if(error){
        throw error;
    }

    return Product.restore(
            data.id,
            data.name,
            data.display_order,
            data.active,
            data.description,
            data.icon,
            data.category_id,
        );
}

async function create(products: Product){
    const{data, error} =  await supabase
    .from("products")
    .insert({
        name: products.getName(),
        description: products.getDescription(),
        icon: products.getIcon(),
        display_order: products.getDisplayOrder(),
        category_id: products.getCategoryId(),
        active: products.isActive(),
    })
    .select()
    .single();

    if(error){
        throw error;
    }
    return data;
}

async function update(product: Product){
    const id = product.getId();

    if(!id){
        throw new Error("Produto sem ID não pode ser atualizado.")
    }

    const{data, error} =  await supabase
    .from("products")
    .update({
        name: product.getName(),
        description: product.getDescription(),
        icon: product.getIcon(),
        display_order: product.getDisplayOrder(),
        category_id: product.getCategoryId(),
        active: product.isActive(),
    })
    .eq("id", id)
    .select()
    .single();
    
    if(error){
        throw error;
    }
    return data;
}

async function remove(id: string){
    const{data, error} =  await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select()
    .single();
    
    if(error){
        throw error;
    }
    return data;
}


async function findByKeyword(keyword: string){
    const {data, error} = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${keyword}%, description.ilike.%${keyword}%`);

    if (error){
        throw error;
    }

    return data;
}

export default{
    findAll,
    findById,
    create,
    update,
    remove,
    findByKeyword,
};