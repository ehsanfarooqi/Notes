const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// DB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE);
    console.log(`Dababase Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
