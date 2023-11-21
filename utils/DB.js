const mongoose = require("mongoose")

const URI = process.env.DATABASE_URI;

const connectDb = async() => {
    try {
        await mongoose.connect(URI);
        console.log("Database Connection Successful");
    } catch (error) {
        console.error("database connection failed...")
    }
}

module.exports = connectDb;