//connection to the mongodb database
// using mongodb atlas for the same. 

const mongoose  = require('mongoose');

const connectDB =  async  () => {
try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
} catch (error) {
    console.log(error, "connection error");
    process.exit(1);
}
};

module.exports = connectDB;

