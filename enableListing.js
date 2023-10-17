import getToken, { user, pass, dlAuth } from "./login.js";
const unitID = "63c5c50266243368085aabc3";
const apicall = "/units/" + unitID;
const unitName = "52";
async function enableListing() {
  const payload = {
    active: true,
    address: {
      street1: "923 Main St.",
      city: "Miami Beach",
      state: " Florida",
      zip: "33139",
      country: "USA",
    },
    addressSameAsProperty: true,
    batch: "2023-01-16-bta4",
    emails: [],
    id: unitID,
    inEviction: false,
    listing: {
      activeListing: true,
      dateAvailable: "2023-09-01",
      contact: "63a20efc0f2e152a3a3df1ac",
      rent: 7009,
    },
    name: unitName,
    portalInfo: {},
    property: "63c5c4f666243368085a713e",
  };
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.put(apicall, payload, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  // Need to rewrite this

  console.log(`Successfully updated deposit. Status ${response.status}`);
  //  console.log(response.data['data'][0]['payrixInfo']['bankInfo'])
}

enableListing();
