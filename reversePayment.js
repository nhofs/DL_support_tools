import getToken, { user, pass, dlAuth } from "./login.js";
// turn off reversal notifications before running this script
//change the two variables below to match the payment you want to reverse + the date you want the reversal to appear on the ledger
let paymentID = "64f22bc2535daa74daa1cf60";
let reverseDate = "2023-09-08";
let pmToken = "pm_1NlbyFGES5MQAgehR9bffHc2";
let pyTxnId = "ch_3NlbyhGES5MQAgeh0i7ULC8O";
let bankNum = "8268";
let merchAccount = "6388fd8898c8715a26134587";
let payMethod = "CARD";
// payMethod is CARD or ECHECK
let expDate = "0427";
// if payMethod is ECHECK use bankRout and replace the expiration attribute with the routing attribute

// let bankRout = "110000000";
//routing: bankRout,

let payFee = "31.8";
let paymentMemo =
  // use this one for normal reversal
  // "This payment was declined by the payer’s bank. Please have them reach out to their banking institution for more information.";

  // use this for NSF message
  //   "insufficient_funds - The customer's account has insufficient funds to cover this payment.";
  // use this one for dispute
  // plz fill this when you find it
  //use this one for fraud refund
  "Transaction refunded back to cardholder due to a merchant team decision.";

async function reversePayment() {
  const payload = {
    leasePayment: paymentID,
    date: reverseDate,
    memo: paymentMemo,
    paymentMethod: "EPAY",
    ePayInfo: {
      fee: payFee,
      method: payMethod,
      token: pmToken,
      txnId: pyTxnId,
      number: bankNum,
      expiration: expDate,
      merchantAccount: merchAccount,
      ipAddress: "69.112.107.176",
      termsAndConditionsAccepted: true,
      termsAndConditionsVersion: "1.0",
      status: "FAILED",
    },
  };
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.post("/lease-reversed-payments", payload, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  // Need to rewrite this

  console.log(`Successfully updated deposit. Status ${response.status}`);
  //  console.log(response.data['data'][0]['payrixInfo']['bankInfo'])
}

reversePayment();
