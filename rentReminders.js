import getToken, { user, pass, dlAuth } from "./login.js";

async function rentReminders() {
  const payload = {
    dbTenant: "63a20efc0f2e152a3a3df1ab",
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
