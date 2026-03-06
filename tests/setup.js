import dotenv from "dotenv";
import path from "path";
import app from "../src/app.js";
import mongoose from "mongoose";

// Set NODE_ENV to test before loading anything
process.env.NODE_ENV = "test";

// Load test environment variables
dotenv.config({ path: path.resolve(".env.test") });

// Connect to MongoDB before each test suite
beforeAll(async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to test database");
      return;
    }

    console.log("🔌 Connecting to test database...");
    console.log("Connection URI:", process.env.MONGO_URI.substring(0, 50) + "...");
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 50000,
      socketTimeoutMS: 60000,
      family: 4  // Use IPv4
    });
    
    // Wait for connection to be ready
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("✅ Test database connected");
  } catch (error) {
    console.error("❌ Failed to connect to test database:", error.message);
    throw error;
  }
}, 60000); // Increase hook timeout to 60 seconds

// Close database connections after all tests have completed
afterAll(async () => {
  try {
    // Close the connection after tests complete
    await mongoose.disconnect();
    console.log("✅ Test database connection closed");
  } catch (error) {
    console.error("Error closing database:", error.message);
  }
});

export default app;