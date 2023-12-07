import getToken, { user, pass, dlAuth } from "./login.js";
//change the paymentID variable below to match the payment you want to reverse
let paymentId = "64c03a64d7570c17aee460a4";
let fullURL = "/lease-payments/" + paymentId;

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
let newpayment = {
  ePayInfo: {
    fee: payment.ePayInfo.fee,
    method: payment.ePayInfo.method,
    token: payment.ePayInfo.token,
    txnId: payment.ePayInfo.txnId,
    number: payment.ePayInfo.number,
    routing: payment.ePayInfo.routing,
    merchantAccount: payment.ePayInfo.merchantAccount,
    expiration: payment.ePayInfo.expiration,
    ipAddress: payment.ePayInfo.ipAddress,
    termsAndConditionsAccepted: true,
    termsAndConditionsVersion: payment.ePayInfo.termsAndConditionsVersion,
    status: "FAILED",
    availableOn: payment.ePayInfo.availableOn,
  },
};

async function updatePayment() {
  let fullURL = "/lease-payments/" + payment.id;
  const payload = Object.assign(payment, newpayment);

  // Get token for login and request merchant account endpoint
  const token = await getToken(user, pass);
  let response = await dlAuth.put(fullURL, payload, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  // Need to rewrite this

  console.log(`payment updated thanks dog.`);
  //  console.log(response.data['data'][0]['payrixInfo']['bankInfo'])
}

updatePayment();
