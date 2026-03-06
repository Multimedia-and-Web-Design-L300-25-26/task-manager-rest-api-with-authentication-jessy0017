import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

// Set NODE_ENV to test
process.env.NODE_ENV = "test";

// Load test environment variables
dotenv.config({ path: path.resolve(".env.test") });

export default async function globalSetup() {
  try {
    console.log("\n🔌 Connecting to test database...");
    
    // Disconnect any existing connection first
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 60000,
      maxPoolSize: 1,
      minPoolSize: 1
    });
    
    // Wait a bit for the connection to be fully ready
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verify connection is ready
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Connection not in ready state");
    }
    
    console.log("✅ Test database connected\n");
  } catch (error) {
    console.error("❌ Failed to connect to test database:", error.message);
    process.exit(1);
  }
}
