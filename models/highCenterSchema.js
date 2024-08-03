const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HighCenterSchema = new Schema({
    center: {
        centerName: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        center_photo: { type: String, required: true }
    },
    validation: { type: Number, required: true }
});

const HighCenter = mongoose.model('HighCenter', HighCenterSchema);

module.exports = HighCenter;
