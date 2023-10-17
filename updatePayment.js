import getToken, { user, pass, dlAuth } from "./login.js";
//change the paymentID variable below to match the payment you want to reverse
let paymentID = "64f22bc2535daa74daa1cf60";
let fullURL = "/lease-payments/" + paymentID;

async function updatePayment() {
  const payload = {
    linkedCharges: [
      {
        amount: 1060,
        linkedTransaction: "64eb7e39f415c16389ba39b6",
        account: "627003e41bc7dc1a4397fc1a",
        linkedTransactionLine: "64eb7e39f415c16389ba39c0",
      },
    ],
    linkedCredits: [],
    amountReceived: 1060,
    register: [
      {
        id: "64f22bc5535daa74daa1d0d0",
      },
      {
        id: "64f22bc5535daa74daa1d0d1",
      },
    ],
    date: "2023-09-01",
    lease: "6281583b1385a835ba95ca39",
    receivedFromTenant: "628157e21385a835ba95c14c",
    reference: "78i194",
    paymentMethod: "EPAY",
    ePayInfo: {
      fee: 31.8,
      method: "CARD",
      token: "pm_1NlbyFGES5MQAgehR9bffHc2",
      txnId: "ch_3NlbyhGES5MQAgeh0i7ULC8O",
      number: "8268",
      merchantAccount: "6388fd8898c8715a26134587",
      expiration: "0427",
      ipAddress: "69.112.107.176",
      termsAndConditionsAccepted: true,
      termsAndConditionsVersion: "1.0",
      status: "FAILED",
      availableOn: "2023-09-05T00:00:00.000Z",
    },
    depositToAccount: "629139533809213482e1b1c6",
    autoApplyPaymentOnCharges: false,
    depositStatus: "DEPOSITED",
    depositEntry: "651d6d92fd7c8326517a2502",
    amountAppliedToCharges: 1060,
    amountNotAppliedToCharges: 0,
    amountAppliedToCredits: 0,
    id: "64f22bc2535daa74daa1cf60",
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

updatePayment();
