const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();

console.log("CLIENT_ID =", process.env.CLIENT_ID);
console.log("REDIRECT_URI =", process.env.REDIRECT_URI);
console.log("SESSION_SECRET =", process.env.SESSION_SECRET);

const salesforceRoutes = require("./routes/salesforceRoutes");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "cloudvandana_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", salesforceRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});