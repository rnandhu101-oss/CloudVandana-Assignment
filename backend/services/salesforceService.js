const jsforce = require("jsforce");
const config = require("../config/salesforceConfig");

const getConnection = (req) => {
  return new jsforce.Connection({
    oauth2: {
      loginUrl: config.loginUrl,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUri: config.redirectUri,
    },
    accessToken: req.session.accessToken,
    instanceUrl: req.session.instanceUrl,
  });
};

module.exports = getConnection;