<script>
    import { goto } from '$app/navigation';
    import {page} from '$app/stores'
    import { refreshAccessToken } from '$lib/auth_req';
    import { onMount } from 'svelte';
    let code = $page.query.get('code')
    let message=""
    onMount(async()=>{
        if(localStorage.getItem('accessToken')){
            try{
                const req = await fetch('http://localhost:8000/user/confirm-new-email',{
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
                goto("/commercant")
                alert(res.message)
                if(res.message == 'jwt expired'){
                    await refreshAccessToken()
                    const req2 = await fetch('http://localhost:8000/user/confirm-new-email',{
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
                    goto("/commercant")
                    alert(res2.messageai)
                }
            }
            catch(e){
                console.log(e)
            }
        }
        else{
        }
    })
</script>
{message}