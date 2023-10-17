import getToken, { user, pass, dlAuth } from "./devlogin.js";

async function leaseRecurring() {
  // const payload = {
  //     recurringTransactionID: "64b1770020c77b0024f4c051",
  // }
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.post(
    "/lease-recurring-transactions/process-one/64b5b1d8a6e4fb00245b88d6",
    {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    }
  );

  // Need to rewrite this

  console.log(`Done ${response.status}`);
  //  console.log(response.data['data'][0]['payrixInfo']['bankInfo'])
}

leaseRecurring();
