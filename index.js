const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const stringRoutes = require("./routes/stringRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
// connectDB();

// Routes
app.use("/strings", stringRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
