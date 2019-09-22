const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    messageText: { type: String, required: true },
    fileData: { type: String },
    fileType: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Message', messageSchema);