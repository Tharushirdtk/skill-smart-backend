require("dotenv").config();
const express = require("express");
const dataSource = require("./config/data-source");
const passport = require("passport");
const routes = require("./app-module");
const { initializePassport } = require("./config/passport-config");
const cors = require("cors");
const { setupSwagger } = require("./config/swagger");

const app = express();

// Enable CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// ✅ Setup Swagger (all controllers: auth, company, employee, etc.)
setupSwagger(app);

// Initialize DB
dataSource
  .initialize()
  .then(() => console.log("✅ Data Source initialized"))
  .catch((err) => console.error("❌ Error initializing data source", err));

// Initialize Passport
initializePassport(passport);
app.use(passport.initialize());

// API Routes
app.use("/api", routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
