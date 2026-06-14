const express = require("express");
const router = express.Router();

const {
  login,
  callback,
  getValidationRules,
  toggleValidationRule,
} = require("../controllers/salesforceController");

router.get("/login", login);

router.get("/callback", callback);

router.get("/validation-rules", getValidationRules);

router.patch("/validation-rule/:id", toggleValidationRule);

module.exports = router;