const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema(
    {
        id: String,
        url: String
    }
);

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;