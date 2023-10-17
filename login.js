import axios from "axios";

// Initialize variables for login
let user = "parrishwhitaker@gmail.com";
let pass = "dl78ed1095d4c60c74a23fc407f54b12d70f70409312937c3c4db391aa8957";

// Create axios instance for both authentication and token
const dlToken = axios.create({
  baseURL: "https://beta.doorloop.com/api/auth/",
  timeout: 5000,
  headers: { Accept: "application/json", "user-agent": "Mozilla/4.0" },
});

const dlAuth = axios.create({
  baseURL: "https://beta.doorloop.com/api",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${getToken(user, pass)}`,
    Accept: "application/json",
    "user-agent": "Mozilla/5.0",
  },
});

async function getToken(user, pass) {
  try {
    // Appending /token with payload to return token
    let response = await dlToken.post("token/", {
      email: user,
      password: pass,
      rememberMe: true,
    });
    console.log(response.data[0]["token"]);
    return response.data[0]["token"];
  } catch (err) {
    return err;
  }
}

export { getToken as default, user, pass, dlAuth };
