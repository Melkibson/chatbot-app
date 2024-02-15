import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    gender : {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    avatar: {
        type: String,
        default: ""
    }
});

const User = mongoose.model('User', userSchema);

export default User;