import getToken, {user, pass, dlAuth} from './login.js'

// Fetch user Property Info 

// Need make this look nicer and maybe add more useful information 

async function getPropertyInfo() {
    const token = await getToken(user, pass)
    let response = await dlAuth.get('/properties',{headers:{Authorization:`Bearer ${token}`,Accept:'application/json'}})

    console.log(response.data.data)
}

getPropertyInfo();