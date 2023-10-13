const mongoose = require('mongoose');

const contactUsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String},
    email: { type: String },
    subject : { type: String },
    message : { type: String }

});

module.exports = mongoose.model('ContactUs', contactUsSchema);