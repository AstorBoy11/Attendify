import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    yearlyTarget: { type: Number, default: 134880 }, // Default target
    dailyTarget: { type: Number, default: 480 }, // Default 8 hours
    avatar: { type: String, default: '' },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
