import getToken, { user, pass, dlAuth } from "./login.js";

async function getMerchantAccounts() {
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.get("/merchant-accounts", {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  // Need to rewrite this
  // for(let merchant in response.data){
  console.log(response.data["data"]);
  //  console.log(response.data['data']['payrixInfo']['bankInfo'])
  // };
}

getMerchantAccounts();
