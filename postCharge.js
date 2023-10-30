//this is a script by johnny to post a charge with the given name of the account

import getToken, {user, pass, dlAuth} from './login.js'
//Hopefully I did this right.. 
// use this to set the account of interest
let accountName = " Merchant Return Payment"
async function getAccountName() {
    const token = await getToken(user, pass);
    let response = await dlAuth.get(
      "accounts/?&page_size=1000&filter_active=true",
      {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      }
    );
    console.log(response.data)

}
let accountId = await getAccountName()



// async function PostCharge() {

// const payload = {
// date:"2023-10-29",
// lease:"653ddcb1af8a003b038dc2ee",
//   lines:[ { amount: 25, 
//   account: accountId} ], 
//   reference: "pls123",
// };


// const token = await getToken(user, pass);
//   let response = await dlAuth.post(
//     "/lease-charges/",
//     payload,
//     {
//       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//     }
//   );

// }

// PostCharge();