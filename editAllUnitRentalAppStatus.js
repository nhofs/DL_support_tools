// this should work but we might want to edit it to go faster if unit count is less than 50
// to use, change activeListing below to either true or false
import getToken, { user, pass, dlAuth } from "./login.js";
import { appendFile } from "node:fs";
appendFile("rentalAppStatusUpdate.txt", user + "\n", (err) => {
  if (err) throw err;
});

//change the variables below to change the status of occupied units for the rental applications
const firstPageNumber = 16;
const newData = {
  rentalApplicationListing: { activeListing: false },
};
//change the variables below to change the status of occupied units for the rental applications

const keyWord = newData.rentalApplicationListing.activeListing
  ? "enabled"
  : "disabled";
const token = await getToken(user, pass);

async function getUnits(pageNumber) {
  let unitsListURL =
    "/reports/rent-roll/?&page_size=50&page_number=" + pageNumber;
  // Get token for login and request merchant account endpoint
  let response = await dlAuth.get(unitsListURL, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  if (
    response.data.data.length * pageNumber !== 0 &&
    response.data.data.length * pageNumber < response.data.total &&
    pageNumber < firstPageNumber + 4
  ) {
    let nextResponse = await getUnits(pageNumber + 1);
    return (response.data.data = [...response.data.data, ...nextResponse]);
  } else {
    return response.data.data;
  }
}

let unitList = await getUnits(firstPageNumber);
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function editRental(data, unitId, url) {
  let response = await dlAuth.put(url, data, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  console.log(keyWord + " rental applications for " + unitId);
  appendFile(
    "rentalAppStatusUpdate.txt",
    keyWord + " rental applications for " + unitId + "\n",
    (err) => {
      if (err) throw err;
    }
  );
  return response;
}

async function getInfoAndEditAllRental(unitList) {
  let unitsRemaining = unitList.length;
  for (let each of unitList) {
    if (each.leaseStatus == "VACANT") {
      console.log("skipping vacant unit " + each["unitId"]);
      unitsRemaining--;
      appendFile(
        "rentalAppStatusUpdate.txt",
        "skipping vacant unit " + each["unitId"] + "\n",
        (err) => {
          if (err) throw err;
        }
      );
    } else {
      let unitId = each["unitId"];
      let unitInfoURL = "/units/" + unitId;
      let response = await dlAuth.get(unitInfoURL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      unitsRemaining--;
      let data = { ...response.data, ...newData };
      await editRental(data, unitId, unitInfoURL);
      console.log(
        unitsRemaining + " units remaining out of " + unitList.length + " units"
      );
      appendFile(
        "rentalAppStatusUpdate.txt",
        unitsRemaining +
          " units remaining out of " +
          unitList.length +
          " units" +
          "\n",
        (err) => {
          if (err) throw err;
        }
      );
      await delay(2600); // delay for 2.6 seconds between loops bc rate limiting is fun
    }
  }
  console.log(
    "rental applications for " + unitList.length + " units " + keyWord
  );
}
console.log(unitList.length + " units found");
getInfoAndEditAllRental(unitList);
