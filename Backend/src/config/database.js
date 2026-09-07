const mongoose = require("mongoose");

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URI);

        console.log("Database connected");
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
}

module.exports = connectToDb;