import getToken, { user, pass, dlAuth } from "./login.js";
// turn off reversal notifications before running this script
//change the two variables below to match the payment you want to reverse + the date you want the reversal to appear on the ledger
let paymentId = "64f22bc2535daa74daa1cf60";
let reverseDate = "2023-09-08";
let fullURL = "/lease-payments/" + paymentId;
let paymentMemo =
  // use this one for normal reversal
  // "This payment was declined by the payer’s bank. Please have them reach out to their banking institution for more information.";

  // use this for NSF message
  //   "insufficient_funds - The customer's account has insufficient funds to cover this payment.";
  // use this one for dispute
  // plz fill this when you find it
  //use this one for fraud refund
  "Transaction refunded back to cardholder due to a merchant team decision.";

async function getPayment() {
  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.get(fullURL, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  console.log(response.data) + "payment data";
  return response.data;
}
let payment = await getPayment();

async function reversePayment() {
  const payload = {
    leasePayment: paymentId,
    date: reverseDate,
    memo: paymentMemo,
    paymentMethod: "EPAY",
    ePayInfo: {
      method: payment.ePayInfo.method,
      token: payment.ePayInfo.token,
      txnId: payment.ePayInfo.txnId,
      number: payment.ePayInfo.number,
      routing: payment.ePayInfo.routing,
      expiration: payment.ePayInfo.expiration,
      merchantAccount: payment.ePayInfo.merchantAccount,
      ipAddress: payment.ePayInfo.ipAddress,
      termsAndConditionsAccepted: true,
      termsAndConditionsVersion: payment.ePayInfo.termsAndConditionsVersion,
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
