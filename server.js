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