const mongoose = require('mongoose');

export const connectDB = async () => {
    const uri = 'mongodb+srv://username:password@cluster0.mongodb.net/mydatabase';
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err))
};
