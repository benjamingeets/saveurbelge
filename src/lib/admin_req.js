import { goto } from "$app/navigation"
import { refreshAccessToken } from "./auth_req"
import { API } from "./env"

export const getUsers = async () =>{
    try{
        const req = await fetch(`${API}/admin/users`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ localStorage.getItem('accessToken')
            }
        })
        const res = await req.json()
        if(res.message == 'jwt expired'){
            await refreshAccessToken()
            return await getUsers()
        }
        else{
            return res
        }
    }catch(error){
    }
}

export const getUser = async (id)=>{
    try{
        const res = await fetch(`${API}/admin/user/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' +localStorage.getItem('accessToken')
            }
        })
        const rep = await res.json()
        if(rep.message == 'jwt expired'){
            await refreshAccessToken()
            return await getUser(id)
        }
        else{
            return rep
        }
    }catch(e){
        
    }
}

export const getShopsFromUserId = async (id)=>{
    try{
        const res = await fetch(`${API}/admin/shops/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' +localStorage.getItem('accessToken')
            }
        })
        const rep = await res.json()
        if(rep.message == 'jwt expired'){
            await refreshAccessToken()
            return await getUser(id)
        }
        else{
            return rep
        }
    }catch(e){
        
    }
}

export const updateUserById = async(user)=>{
    try{
        const res = await fetch(`${API}/admin/user/${user._id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' +localStorage.getItem('accessToken')
            },
            body:JSON.stringify({
                ...user
            })
        })
        const rep = await res.json()
        if(rep.message == 'jwt expired'){
            await refreshAccessToken()
            return await updateUserById(user)
        }
        else{
            return rep
        }
    }catch(e){
        
    }
}

export const getAllShops = async () =>{
    console.log("shop")
    try{
        const res = await fetch(`${API}/admin/shops`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' +localStorage.getItem('accessToken')
            }
        })
        const rep = await res.json()
        if(rep.message == 'jwt expired'){
            await refreshAccessToken()
            return await getAllShops()
        }
        else{
            return rep
        }
    }catch(e){
        
    }   
}

export const deleteUserById = async (id)=>{
    try{
        const res = await fetch(`${API}/admin/user/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' +localStorage.getItem('accessToken')
            }
        })
        const rep = await res.json()
        if(rep.message == 'jwt expired'){
            await refreshAccessToken()
            return await deleteUserById(id)
        }
        else{
            return rep
        }
    }catch(e){
        
    }
}

export const getShopAdmin = async (id)=>{
    try{
        const req = await fetch(`${API}/admin/shop/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ localStorage.getItem('accessToken')
            }
        })
        const rep = await req.json()
        if(rep.message == 'jwt expired'){
            await refreshAccessToken()
            return await getShopAdmin(id)
        }
        else{
            return rep
        }
        return rep
    }
    catch{

    }
}