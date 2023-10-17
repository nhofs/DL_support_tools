// this doesnt work yet

import getToken, { user, pass, dlAuth } from "./login.js";
let propertyID = "64f7ad50fed7f55a38139ff0";
let tuPropID = "3726467";
let fullURL = "/rental-applications/" + propertyID;

async function rentalUpdate() {
  const payload = {
    transunionFee: 40,
    transunionPropertyId: tuPropID,
    enabled: true,
    fees: {
      acceptedTermsAndConditions: true,
      applicationFee: 44,
      chargeApplicationFee: true,
      requestTransunionReports: false,
      requireOnlinePayment: true,
      _id: "652030ed3205a807b19fffc9",
    },
  };
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.put(fullURL, payload, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  // Need to rewrite this

  console.log(`Successfully updated deposit. Status ${response.status}`);
  //  console.log(response.data['data'][0]['payrixInfo']['bankInfo'])
}

rentalUpdate();
