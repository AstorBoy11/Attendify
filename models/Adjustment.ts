import mongoose from 'mongoose';

const AdjustmentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    startDate: { type: String, required: true }, // "YYYY-MM-DD"
    endDate: { type: String, required: true },   // "YYYY-MM-DD"
    reductionMinutes: { type: Number, required: true, min: 0 },
}, { timestamps: true });

// Index for efficient date-range queries
AdjustmentSchema.index({ startDate: 1, endDate: 1 });

export default mongoose.models.Adjustment || mongoose.model('Adjustment', AdjustmentSchema);
