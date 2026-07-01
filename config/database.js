import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        mongoose.set("strictQuery", true);

        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            autoIndex: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });

        console.log("======================================");
        console.log("✅ MongoDB Connected Successfully");
        console.log(`📦 Database : ${connection.connection.name}`);
        console.log(`🖥️ Host      : ${connection.connection.host}`);
        console.log(`🚀 Port      : ${connection.connection.port}`);
        console.log("======================================");

        mongoose.connection.on("connected", () => {
            console.log("🟢 MongoDB connection established.");
        });

        mongoose.connection.on("disconnected", () => {
            console.log("🟡 MongoDB disconnected.");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("🔄 MongoDB reconnected.");
        });

        mongoose.connection.on("error", (err) => {
            console.error("🔴 MongoDB Error:", err.message);
        });

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("🛑 MongoDB connection closed.");
            process.exit(0);
        });

    } catch (error) {
        console.error("❌ Failed to connect to MongoDB");
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDatabase;
