const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://adi123:abb131705@cluster0.kugtute.mongodb.net/IntelligentAssessment?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error:", error.message);
   
  }
};
module.exports = connectDB;
