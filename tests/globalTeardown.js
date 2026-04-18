import mongoose from "mongoose";

export default async function globalTeardown() {
  try {
    console.log("\n🔌 Closing test database connection...");
    await mongoose.connection.close();
    console.log("✅ Test database connection closed\n");
  } catch (error) {
    console.error("❌ Error closing database:", error.message);
  }
}
