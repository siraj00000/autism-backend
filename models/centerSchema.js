const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    image: { type: String, required: true }
});

const CenterSchema = new Schema({
    center: {
        centerName: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        center_photo: { type: String, required: true }
    },
    images: [ImageSchema],
    validation: { type: Number, required: true }
});

const Center = mongoose.model('Center', CenterSchema);

module.exports = Center;
