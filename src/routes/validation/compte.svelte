<script>
    import { goto } from '$app/navigation';
    import {page} from '$app/stores'
    import { refreshAccessToken } from '$lib/auth_req';
    import { onMount } from 'svelte';
    import {API} from '$lib/env.js'
    let code = $page.query.get('code')
    let message=""
    onMount(async()=>{
        if(localStorage.getItem('accessToken')){
            console.log("he")
            
            try{
                const req = await fetch(`${API}/user/set-account-validation`,{
                    method:'POST',
                    headers:{
                        'Authorization':`Bearer: ${localStorage.getItem('accessToken')}`,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        code:code
                    })
                })
                const res = await req.json()
                console.log(res.message)
                message = res.message
                goto("/deconnexion")
                alert("Votre compte a été validé")
                if(res.message == 'jwt expired'){
                    await refreshAccessToken()
                    const req2 = await fetch(`${API}/user/set-account-validation`,{
                        method:'POST',
                        headers:{
                            'Authorization':`Bearer: ${localStorage.getItem('accessToken')}`,
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            code:code
                        })
                    })
                    const res2 = await req.json()
                    message = res2.message
                    goto("/deconnexion")
                    alert("Votre compte a été validé")
                }
            }
            catch(e){
                console.log(e)
            }
        }
        else{
            goto(`/connexion?next=validation/compte&code=${code}`)
        }
    })
</script>
{message}