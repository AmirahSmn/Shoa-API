const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String},
    paragraph: { type: String }
});

module.exports = mongoose.model('Blog', blogSchema);