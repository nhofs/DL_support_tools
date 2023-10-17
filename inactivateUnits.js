import getToken, { user, pass, dlAuth } from "./login.js";
let propID = "62ebac51ed6080651736075a";
let unitsListURL = "/units/listings?page_number=1&filter_property=" + propID;

async function getUnits() {
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.get(unitsListURL, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  return response.data["data"];
}

let unitList = await getUnits();

async function inactivateUnits() {
  for (let each of unitList) {
    console.log(each["unitName"]);
    let unitID = each["unitId"];
    let inactivateUnitsURL = "/units/" + unitID;
    let payload = {
      active: false,
      addressSameAsProperty: true,
      amenities: each["unitAmenities"],
      baths: each["baths"],
      beds: each["beds"],
      description: each["unitDescription"],
      end: each["end"],
      leaseId: each["leaseId"],
      leaseStatus: each["leaseStatus"],
      listing: each["listing"],
      marketRent: each["marketRent"],
      name: each["unitName"],
      pictures: each["pictures"],
      property: each["property"],
      size: each["size"],
      start: each["start"],
      unitAmenities: each["unitAmenities"],
      unitDescription: each["unitDescription"],
      unitId: each["unitId"],
      unitName: each["unitName"],
    };

    // Get token for login and request merchant account endpoint
    const token = await getToken(user, pass);
    let response = await dlAuth.put(inactivateUnitsURL, payload, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    console.log("unit " + unitID + " inactivated");
  }
  console.log("units inactive");
}
inactivateUnits();
