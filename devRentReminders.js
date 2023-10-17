import getToken, { user, pass, dlAuth } from "./devlogin.js";

async function rentReminders() {
  const payload = {
    dbTenant: "632091c05e71360e4eb29921",
    processRentRemindersFor: "DBTENANT",
  };
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.post(
    "/recurring-transactions/process-rent-reminders",
    payload,
    {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    }
  );

  // Need to rewrite this

  console.log(`Done ${response.status}`);
  //  console.log(response.data['data'][0]['payrixInfo']['bankInfo'])
}

rentReminders();
