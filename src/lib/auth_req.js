export const login = async (email,pwd)=>{
    try{
        const req = await fetch('http://localhost:8000/login',{
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
        const req = await fetch('http://localhost:8000/logout',{
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
        const req = await fetch('http://localhost:8000/refresh-token',{
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

