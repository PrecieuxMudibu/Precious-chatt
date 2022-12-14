const mongoose = require('mongoose');

// const conversation_schema = mongoose.Schema({
//     conversation_participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     conversation_messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
// });

const conversation_schema = mongoose.Schema({
    conversation_participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ],
});

module.exports = mongoose.model('Conversation', conversation_schema);
