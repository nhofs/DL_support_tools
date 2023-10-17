import getToken, {user, pass, dlAuth} from './login.js'


async function depositFunds(){

    const payload = {
        date: "2023-07-03",
        depositToAccount: "63fd1096f5d8f217ec191246",
        linkedTransactions: [{linkedTransaction: "649b55745eb56f17e139b429", amount: 6.50}, {linkedTransaction: "64a59444422f7717b9c32d38", amount: 1000}, {linkedTransaction: "64a59452339aae17be3cdbb0", amount: 100}],
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


