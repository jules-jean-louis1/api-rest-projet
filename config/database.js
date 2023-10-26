const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = connectDB;

