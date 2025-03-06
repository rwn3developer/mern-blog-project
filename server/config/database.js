const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_CONNECTION);
        console.log(`Database successfully connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // exit process with failure code
    }
};        
module.exports = connectDB;
