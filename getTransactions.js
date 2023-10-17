import getToken, {user, pass, dlAuth} from './login.js'

async function getTransactionList() {
    const token = await getToken(user, pass)
    let response = await dlAuth.get('/reports/transactions-list/',{headers:{Authorization:`Bearer ${token}`,Accept:'application/json'}})
    console.log(response.data.data)
}
getTransactionList();

