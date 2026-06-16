const jsforce = require("jsforce");
const config = require("../config/salesforceConfig");

// DEBUG
console.log("CONFIG VALUES:", config);

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
  try {
    const oauth2 = new jsforce.OAuth2({
      loginUrl: config.loginUrl,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUri: config.redirectUri,
    });

    const authUrl = oauth2.getAuthorizationUrl({
      scope: "api refresh_token",
    });

    console.log("AUTH URL:", authUrl);

    res.redirect(authUrl);
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      error: "Login Failed",
      details: err.message,
    });
  }
};

// ---------------- CALLBACK ----------------
exports.callback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({
      error: "Authorization code missing",
    });
  }

  const conn = new jsforce.Connection({
    oauth2: {
      loginUrl: config.loginUrl,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUri: config.redirectUri,
    },
  });

  try {
    await conn.authorize(code);

    // Save session
    req.session.accessToken = conn.accessToken;
    req.session.instanceUrl = conn.instanceUrl;

    console.log("✅ Salesforce Login Success");
    console.log("Instance URL:", conn.instanceUrl);

    // Redirect frontend
    res.redirect(
      `${process.env.FRONTEND_URL}/dashboard`
    );
  } catch (err) {
    console.error("AUTH ERROR:", err);

    res.status(500).json({
      error: "Authorization Failed",
      details: err.message,
    });
  }
};

// ---------------- GET VALIDATION RULES ----------------
exports.getValidationRules = async (req, res) => {
  try {
    if (!req.session.accessToken) {
      return res.status(401).json({
        error: "Unauthorized. Please login first.",
      });
    }

    const conn = new jsforce.Connection({
      accessToken: req.session.accessToken,
      instanceUrl: req.session.instanceUrl,
    });

    const result = await conn.tooling.query(`
      SELECT Id,
             ValidationName,
             Active,
             EntityDefinition.QualifiedApiName
      FROM ValidationRule
    `);

    res.json(result.records);
  } catch (err) {
    console.error(
      "VALIDATION RULE ERROR:",
      err
    );

    res.status(500).json({
      error:
        "Failed to fetch validation rules",
      details: err.message,
    });
  }
};

// ---------------- TOGGLE VALIDATION RULE ----------------
exports.toggleValidationRule = async (req, res) => {
  try {
    console.log("TOGGLE API HIT");

    if (!req.session.accessToken) {
      return res.status(401).json({
        error: "Unauthorized. Please login first.",
      });
    }

    const { id } = req.params;
    const { active } = req.body;

    console.log("RULE ID:", id);
    console.log("ACTIVE:", active);

    const conn = new jsforce.Connection({
      accessToken: req.session.accessToken,
      instanceUrl: req.session.instanceUrl,
    });

    // Get rule details
    const result = await conn.tooling.query(`
      SELECT Id,
             ValidationName,
             Active,
             EntityDefinition.QualifiedApiName
      FROM ValidationRule
      WHERE Id='${id}'
    `);

    if (!result.records.length) {
      return res.status(404).json({
        error: "Validation rule not found",
      });
    }

    const rule = result.records[0];

    // Correct full name
    const fullName =
      `${rule.EntityDefinition.QualifiedApiName}.${rule.ValidationName}`;

    console.log("FULL NAME:", fullName);

    // Metadata update
    const updateResult =
      await conn.metadata.update(
        "ValidationRule",
        {
          fullName,
          active,
        }
      );

    console.log(
      "UPDATE RESULT:",
      updateResult
    );

    if (!updateResult.success) {
      throw new Error(
        "Salesforce update failed"
      );
    }

    res.json({
      success: true,
      active,
      message: `Validation Rule ${
        active ? "Enabled" : "Disabled"
      } Successfully`,
    });
  } catch (err) {
    console.error(
      "TOGGLE ERROR:",
      err
    );

    res.status(500).json({
      error:
        "Failed to update validation rule",
      details: err.message,
    });
  }
};