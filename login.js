import axios from "axios";

// Initialize variables for login
let user = "";
let pass = "";

// Create axios instance for both authentication and token
const dlToken = axios.create({
  baseURL: "https://beta.doorloop.com/api/auth/",
  timeout: 10000,
  headers: { Accept: "application/json", "user-agent": "Mozilla/4.0" },
});

const dlAuth = axios.create({
  baseURL: "https://beta.doorloop.com/api",
  timeout: 10000,
  headers: {
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
