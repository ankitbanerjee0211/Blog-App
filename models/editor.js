const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const editorSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Editor = mongoose.model('Editor', editorSchema);
// this const is basically Capital by practice

module.exports = Editor;