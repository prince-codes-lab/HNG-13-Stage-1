const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const stringRoutes = require("./routes/stringRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
app.use(express.json());




// Routes
app.use("/strings", stringRoutes);

// Error handler
app.use(errorHandler);


const start = async (PORT) => {

    // connect to DB
    await connectDB();
    console.log("DB connected");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

start(process.env.PORT || 4000);
