import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log('Connection to DB successful');
    } catch (error) {
        console.log('Could not connect to DB: ' + error);
    }
}