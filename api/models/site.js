const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String},
    location: { type: String }
});

module.exports = mongoose.model('Site', siteSchema);