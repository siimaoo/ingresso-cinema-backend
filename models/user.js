var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

UserSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    senha: {
        type: String,
        required: true,
        select: false
    }
})

UserSchema.pre('save', function (next) {
    let user = this;
    if(!user.isModified('senha')) return next();
    bcrypt.hash(user.senha, 10, (err, encrypted) => {
        user.senha = encrypted;
        return next();
    })
})

module.exports = mongoose.model('user', UserSchema);