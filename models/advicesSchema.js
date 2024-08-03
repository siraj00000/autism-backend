const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdviceSchema = new Schema({
    advice: { type: String, required: true },
    image: { type: String, required: true }
});

const Advice = mongoose.model('Advice', AdviceSchema);

module.exports = Advice;
