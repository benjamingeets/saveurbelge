
import { API } from "./env"
export const publicShopQuery = async(query)=>{
    try{
        const req = await fetch(`${API}/query`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                ...query
            })
        })
        const res = await req.json()
        return res
    }catch(error){
        
    }
}

export const getShopFromSlug = async (slug) =>{
    try{
        const req = await fetch(`${API}/shop-from-slug/${slug}`,{
            method:'GET'
        })
        const res = await req.json()
        return res
    }catch(error){
        
    } 
}

export const searchCityName = async (cp) =>{
    if(cp.length == 4){
        const cityNameQuery = await fetch(`${API}/get-city-from-cp/${cp}`)
        const cityName = await cityNameQuery.json()
        return cityName.name
    }
    else if(cp.length === 0){
        return "Tournai"
    }
    else{
        return "..."
    }
}