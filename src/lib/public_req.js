
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