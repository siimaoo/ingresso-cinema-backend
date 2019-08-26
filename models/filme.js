const mongoose = require('mongoose');
const Schema = mongoose.Schema;

FilmeSchema = new Schema({
    filmId: {
        type: String,
        required: true
    },
    posicaoAbs: {
        type: Number,
        required: true
    },
    posicaoOrd: {
        type: String,
        required: true,
    },
    numSala: {
        type: Number,
        required: true,
    },
    dia: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('filme', FilmeSchema);