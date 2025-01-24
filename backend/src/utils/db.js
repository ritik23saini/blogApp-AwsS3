const mongoose = require('mongoose');

export const connectDB = async () => {
    const uri = process.env.Mongodb_Url;
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err))
};
