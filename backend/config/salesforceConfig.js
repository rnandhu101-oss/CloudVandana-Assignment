require("dotenv").config();

module.exports = {
  loginUrl:
    process.env.LOGIN_URL,
  clientId:
    process.env.CLIENT_ID,
  clientSecret:
    process.env.CLIENT_SECRET,
  redirectUri:
    process.env.REDIRECT_URI,
};