var mongoose = require('mongoose');
var Schema = mongoose.Schema;

SalaSchema = new Schema({
    numero: {
        type: Number
    },
    sessoes: [
        {type: String}
    ],
    posicaoCadeira: {
        posAbs: {type: Number },
        posOrd: {type: String},
        ocupado: {type: Boolean, default: false}
    }
})

module.exports = mognoose.model('sala', SalaSchema);