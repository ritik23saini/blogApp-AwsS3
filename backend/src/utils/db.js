
import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.Mongodb_Url).then(() => {
        console.log("Db connect success")
    }).catch(() => {
        console.log("Not connected to Database ")
    })
}

