import getToken, { user, pass, dlAuth } from "./login.js";
//to run, update propID and user login info + pagenumber
let propID = "654541b226b4a9107d41c8a4";
let leaseListURL =
  "/leases/?&page_size=50&page_number=1&filter_property=" +
  propID +
  "&filter_status=ACTIVE";

const newData = { term: "AtWill" };
const token = await getToken(user, pass);
async function getLeases() {
  // Get token for login and request merchant account endpoint
  let response = await dlAuth.get(leaseListURL, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  return response.data["data"];
}

let leaseList = await getLeases();

async function updateToMonthly() {
  for (let each of leaseList) {
    let leaseID = each["id"];
    let URL = "/leases/" + leaseID;
    let response = await dlAuth.get(URL, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });

    let data = { ...response.data, ...newData };

    // Get token for login and request merchant account endpoint

    await dlAuth.put(URL, data, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    console.log(`Lease ${leaseID} updated`);
  }

  console.log(`Done updating leases`);
}
updateToMonthly();
