const app = require('./app');
const connectDB = require('./config/db');

const defaultport = 5000;
const PORT =  process.env.PORT || defaultport;


async function connectToDB(){
    try {
       await connectDB();
       app.listen(PORT, function (){
        console.log(`server running on the port ${PORT}`)
       }) 
    } catch (error) {
        console.log(error, 'error in establishing the Aconnection...')
    }
}; 

// ESTABLISH THE CONNECTION...
connectToDB();

// GREACEFULL SHUTDOWN.
const shutdown = (signal) => {
  console.log(`\nReceived ${signal}, shutting down...`);
  server.close(async () => {
    try {
      await mongoose.connection.close(false);
      console.log('DB connection closed');
      process.exit(0);
    } catch (e) {
      console.error('Error during shutdown', e);
      process.exit(1);
    }
  });
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));