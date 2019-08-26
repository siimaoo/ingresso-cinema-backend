var mongoose = require('mongoose');
var axios = require('axios');
var Filme = require('../models/filme');

module.exports = {
    async getAll(req, res) {
        try {
            const filmes = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=0f36dbec00b62c19949c9a151c7f5a57&language=pt-BR&page=1&region=BR')
                .then(filmes => res.send(filmes.data))
                .catch(err => {
                    return res.send(
                        {
                            "mensagem": "Ocorreu algum erro durante a requisição",
                            "error": `Erro: \n ${err}`,
                            "success": false
                        }
                    )
                })
        }
        catch (e) {
            return res.send(
                {
                    "mensagem": "Ocorreu algum erro durante a requisição",
                    "error": `Erro: \n ${e}`,
                    "success": false
                }
            )

        }
    },
    async getById(req, res) {
        try {
            const filmes = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=0f36dbec00b62c19949c9a151c7f5a57&language=pt-BR&page=1&region=BR`)
                .then(filmes => res.send(filmes.data))
                .catch(err => {
                    return res.send(
                        {
                            "mensagem": "Ocorreu algum erro durante a requisição",
                            "error": `Erro: \n ${err}`,
                            "success": false
                        }
                    )
                })
        }
        catch (e) {
            return res.send({
                mensagem: "Ocorreu algum erro durante a requisição",
                error: `Erro: \n ${e}`,
                success: false
            })
        }
    },
    async buyTicket(req, res) {
        try {
            let filmeId = await req.params.id;
            let sala = await req.body.sala;
            let posicaoAbs = await req.body.posicaoAbs;
            let posicaoOrd = await req.body.posicaoOrd;
            let dia = await req.body.dia;
            let horario = await req.body.horario;
            await Filme.create({
                filmId: filmeId,
                posicaoAbs: posicaoAbs,
                posicaoOrd: posicaoOrd,
                numSala: sala,
                dia: dia,
                horario: horario
            }).then(() => {
                return res.send({
                    mensagem: "Compra do ingresso realizada com sucesso! \n Aguarde a confirmação.",
                    success: true
                });
            }).catch((e) => {
                return res.send({
                    mensagem: "Ocorreu algum erro durante a requisição",
                    error: `Erro: \n ${e}`,
                    success: false
                })
            })

        }
        catch (e) {
            return res.send({
                mensagem: "Ocorreu algum erro durante a requisição",
                error: `Erro: \n ${e}`,
                success: false
            })
        }
    }
}