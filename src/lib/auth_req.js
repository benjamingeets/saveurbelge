import { API } from "./env"
export const login = async (email,pwd)=>{
    try{
        const req = await fetch(`${API}/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                pwd
            })
        })
        const res = await req.json()
        localStorage.setItem('accessToken',res.accessToken)
        localStorage.setItem('refreshToken',res.refreshToken)
        localStorage.setItem('status',res.status)
        return true
    }catch(error){
        return false
    }
}

export const logout = async()=>{
    try{
        const refreshToken = localStorage.getItem('refreshToken')
        const req = await fetch(`${API}/logout`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                refreshToken:refreshToken
            })
        })
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('status')
        return true
    }
    catch(error){
        console.log(error)
        return false
    }
}

export const refreshAccessToken = async()=>{
    try{
        const refreshToken = localStorage.getItem('refreshToken')
        const req = await fetch(`${API}/refresh-token`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                refreshToken
            })
        })
        const res = await req.json()
        localStorage.setItem('accessToken',res.accessToken)
        return true
    }catch(error){
        return false
    }
}

