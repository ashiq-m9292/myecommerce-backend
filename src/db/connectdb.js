import mongoos from "mongoose";

const connectDB = async (DB_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: process.env.DB_NAME
        };
        await mongoos.connect(DB_URL, DB_OPTIONS);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("error is connectdb function", error, error.message)
    };
};

export default connectDB;