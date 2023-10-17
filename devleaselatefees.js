import getToken, { user, pass, dlAuth } from "./devlogin.js";

async function leaseLateFee() {
  const payload = {
    leaseId: "64b6989f1b6b6e0024256110",
  };
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.post("/leases/process-late-fees", payload, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  // Need to rewrite this

  console.log(`Done ${response.status}`);
  //  console.log(response.data['data'][0]['payrixInfo']['bankInfo'])
}

leaseLateFee();
