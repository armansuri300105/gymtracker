import mongoose from "mongoose"

export const connect = async (URL) => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("Unable to connection mongoDB: ", error);
    }
}