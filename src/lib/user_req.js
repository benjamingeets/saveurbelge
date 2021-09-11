import { goto } from "$app/navigation"
import { refreshAccessToken } from "./auth_req"
import { API } from "./env"
export const getUserShops = async()=>{
    try{
        const req = await fetch(`${API}/user/shops`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ localStorage.getItem('accessToken')
            }
        })
        const res = await req.json()
        if(res.message == 'jwt expired'){
            await refreshAccessToken()
            return await getUserShops()
        }
        else{
            return res
        }
    }catch(error){
    }
}

export const getUserInformations = async()=>{
    try{
        const req = await fetch(`${API}/user`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ localStorage.getItem('accessToken')
            }
        })
        const res = await req.json()
        if(res.message == 'jwt expired'){
            await refreshAccessToken()
            return await getUserInformations()
        }
        else{
            return res
        }
    }catch(error){
        console.log(error)
    }
}

export const updateUserInformations = async (body)=>{
    try{
        const res = await fetch(`${API}/user`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' +localStorage.getItem('accessToken')
            },
            body:JSON.stringify({
                ...body
            })
        })
        const rep = await res.json()
        if(rep.message == 'jwt expired'){
            await refreshAccessToken()
            return await updateUserInformations(body)
        }
        else{
            return rep
        }
    }catch(e){
        
    }
}

export const updatePwd = async (pwd,newPwd)=>{
    try{
        const res = await fetch(`${API}/user/update-pwd`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' +localStorage.getItem('accessToken')
            },
            body:JSON.stringify({
                pwd,newPwd
            })
        })
        
        const rep = await res.json()
        if(rep.message == 'jwt expired'){
            await refreshAccessToken()
            return await updatePwd(pwd,newPwd)
        }
        else{
            return rep
        }
    }catch(e){
        return 'err'
    }
}

export const getShop = async (id)=>{
    try{
        const res = await fetch(`${API}/shop/${id}`)
        const rep = await res.json()
        return rep
    }
    catch{

    }
}

export const deleteShop = async (id)=>{
    try{
        const res = await fetch(`${API}/user/shop/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' +localStorage.getItem('accessToken')
            }
        })
        if(parseInt(localStorage.getItem('status'))==5){
            goto("/admin/shop")
        } 
        goto('/commercant')
    }
    catch(e){

    }
}

export const getLostPwd = async (email)=>{
    try{
        const res = await fetch(`${API}/user/get-lost-password`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:email})
        })
        const rep = await res.json()
        return rep
    }catch{

    }
}

export const setLostPwd = async (email,code,pwd)=>{
    try{
        const res = await fetch(`${API}/user/set-lost-password`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                code:code,
                pwd:pwd
            })
        })
        const rep = await res.json()
        return rep
    }catch{

    }
}

export const createShop = async (shop,images)=>{
    try{
        const reqShop = await fetch(`${API}/user/shop`,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({...shop})
        })
        
        let res = await reqShop.json()
        if(res.message =="jwt expired"){
            await refreshAccessToken()
            return await createShop(shop,images)
        }
        const reqImages = await fetch(`${API}/upload`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('accessToken')}`,
                'shopid':res.id
            },
            body:images
        })
        return res
    }
    catch(e){
        return e
    }
}

export const updateShop = async (shop,images) =>{
    try{
        const reqShop = await fetch(`${API}/user/shop/${shop._id}`,{
        method:'PUT',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({...shop})
        })
        
        let res = await reqShop.json()
        if(res.message =="jwt expired"){
            await refreshAccessToken()
            return await updateShop(shop,images)
        }
        if(images){
            const reqImages = await fetch(`${API}/upload`,{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('accessToken')}`,
                    'shopid':res.id
                },
                body:images
            })
        }
                
        
        return res
    }
    catch(e){
        return e
    }
}

export const createAccount = async (email,pwd,first_name,last_name)=>{
    try{
        const res = await fetch(`${API}/user`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                pwd:pwd,
                first_name:first_name,
                last_name:last_name
            })
        })
        const rep = await res.json()
        return rep
    }catch{

    }
}