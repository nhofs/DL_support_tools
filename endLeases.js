import getToken, { user, pass, dlAuth } from "./login.js";
let propID = "64cba93bd4d94d1814435e5c";
let leaseListURL =
  "/leases/?&page_size=50&page_number=1&filter_property=" +
  propID +
  "&filter_status=ACTIVE";

async function getLeases() {
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.get(leaseListURL, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  // console.log(response.data["data"]);
  return response.data["data"];
}

let leaseList = await getLeases();

let endLeaseURL = "/leases/end-lease";

async function endLeases() {
  for (let each of leaseList) {
    let leaseID = each["id"];
    let payload = {
      leaseId: leaseID,
      movedOutAt: each["end"] || "2023-12-19",
      noticeToMoveOutAt: each["end"] || "2023-12-19",
    };
    // Get token for login and request merchant account endpoint
    const token = await getToken(user, pass);
    await dlAuth.post(endLeaseURL, payload, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    console.log(`Lease ${leaseID} ended`);
  }

  console.log(`Done ending leases`);
}
endLeases();
