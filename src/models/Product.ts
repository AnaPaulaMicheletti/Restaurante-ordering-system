import supabase from "../config/supabase.js";

async function findAll(){
    const{data, error} =  await supabase
    .from("products")
    .select("*");

    if(error){
        throw error;
    }
    return data;
}

async function findById(id: string){
    const{data, error} =  await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

    if(error){
        throw error;
    }
    return data;
}

async function create(products: {
    category_id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    available: boolean;
    active: boolean;
}) {
    const{data, error} =  await supabase
    .from("products")
    .insert(products)
    .select()
    .single();

    if(error){
        throw error;
    }
    return data;
}

async function update(id: string, product: {
    name: string,
    description: string,
    icon: string,
    display_order: number,
    active: boolean,
}) {
    const{data, error} =  await supabase
    .from("products")
    .update(product)
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