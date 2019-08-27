var bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Users = require("../models/user");

module.exports = {
    async findUserById(req, res) {
        try {
            let id = await req.params.id;
            Users.findById(id, (err, data) => {
                if (err) {
                    return res.send({
                        mensagem: "Ocorreu algum erro durante a requisição",
                        error: `Erro: \n ${err}`,
                        success: false
                    })
                }
                else {
                    return res.send({
                        data,
                        success: true
                    })
                }
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