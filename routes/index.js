var express = require('express');
var router = express.Router();
var filmeController = require('../controller/filmeController');

//EndPoints

//Retorna todos os filmes em cartaz
router.get('/filmes', filmeController.getAll);
//Retorna dados do filme pelo id
router.get('/filmes/:id', filmeController.getById);

//Ato de comprar ingresso
router.post('/filmes/:id/ingressos', filmeController.buyTicket);

//Retorna as salas disponiveis
router.get('/salas', );
//Retorna cadeiras da sala
router.get('/salas/:id', );
//alterar estado da cadeira
router.put('/salas/:id/cadeira/:id');

//Retorna os dados do usuario
router.get('/user/:id', );
//Cria um usuario
router.post('/user/', );
//Alterar dados de um usuario
router.put('/user/:id', );
//Deletar um usuario
router.delete('/user/:id', );







module.exports = router;
