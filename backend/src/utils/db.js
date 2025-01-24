import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongodb_Url).then(() => {
            console.log("Database connected");
            return;
        });

    } catch (error) {
        console.log("Error: ", error);
        process.exit(1);
    }
};
