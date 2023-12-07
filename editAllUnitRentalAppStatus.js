// this should work but we might want to edit it to go faster if unit count is less than 50
// to use, change activeListing below to either true or false
import getToken, { user, pass, dlAuth } from "./login.js";
let newData = {
  rentalApplicationListing: { activeListing: true },
};
let keyWord = newData.rentalApplicationListing.activeListing
  ? "enabled"
  : "disabled";
const token = await getToken(user, pass);
async function getUnits(pageNumber) {
  let unitsListURL =
    "/reports/rent-roll/?&page_size=1000&page_number=" + pageNumber;
  // Get token for login and request merchant account endpoint
  let response = await dlAuth.get(unitsListURL, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  if (
    response.data.data.length * pageNumber !== 0 &&
    response.data.data.length * pageNumber < response.data.total
  ) {
    let nextResponse = await getUnits(pageNumber + 1);
    return (response.data.data = [...response.data.data, ...nextResponse]);
  } else {
    return response.data.data;
  }
}

let unitList = await getUnits(1);
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function editRental(data, unitId, url) {
  let response = await dlAuth.put(url, data, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  console.log(keyWord + " rental applications for " + unitId);
  return response;
}

async function getInfoAndEditAllRental(unitList) {
  let unitsRemaining = unitList.length;
  for (let each of unitList) {
    let unitId = each["unitId"];
    let unitInfoURL = "/units/" + unitId;
    let response = await dlAuth.get(unitInfoURL, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    unitsRemaining--;
    let data = { ...response.data, ...newData };
    await editRental(data, unitId, unitInfoURL);
    console.log(
      unitsRemaining + " units remaining out of " + unitList.length + " units"
    );
    await delay(2600); // delay for 2.6 seconds between loops bc rate limiting is fun
  }
  console.log("all rental applications " + keyWord);
}
console.log(unitList.length + " units found");
getInfoAndEditAllRental(unitList);
