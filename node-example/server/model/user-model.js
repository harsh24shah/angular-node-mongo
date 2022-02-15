const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var schema = new mongoose.Schema({
    userId: { type: String, required: true },
    fname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 5 }
});

schema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

schema.methods.isValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}

const UserModal = mongoose.model('user', schema);

module.exports = UserModal;