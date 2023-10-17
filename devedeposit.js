import getToken, {user, pass, dlAuth} from './devlogin.js'


async function depositFunds(){

    const payload = {
        date: "2023-07-03",
        depositToAccount: "6447f720ffbca50024982068",
        linkedTransactions: [{linkedTransaction: "64a5710558b3e000243b5b6e", amount: 11.00}, {linkedTransaction: "64a56eec58b3e000243b5339", amount: 13}],
        // merchantAccountDisbursement: "hgrdks54ewfghsyjk54",
        reference: "po_1NPaQo4gsvYCAjnVv3rvfyEx"
    }   
    // Get token for login and request merchant account endpoint
    const token = await getToken(user,pass)
    let response = await dlAuth.post('/deposits', payload, {headers:{Authorization:`Bearer ${token}`,Accept:'application/json'}})

    // Need to rewrite this

     console.log(`Successfully updated deposit. Status ${response.status}`)
    //  console.log(response.data['data'][0]['payrixInfo']['bankInfo'])
  }

depositFunds()
