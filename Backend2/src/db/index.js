import dns from "node:dns";
dns.setServers(["8.8.8.8"]);

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        console.log("Mongo URL:", process.env.MONGODB_URL);

        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: DB_NAME,
        });

        console.log(
            `MongoDB Connected!! DB HOST: ${connectionInstance.connection.host}`
        );

    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
};

export default connectDB;