var bcrypt = require("bcryptjs");
const Users = require("../models/user");
require('dotenv').config();

const createUserToken = async (userId) => {
    return await jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: '7d' });
}

module.exports = {
    async findUserById(req, res) {
        try {
            let id = await req.params.id;
            await Users.findById(id, (err, data) => {
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
    },
    async createUser() {
        try {
            let { emai, nome, senha } = await req.body;
            if (!email || !nome || !senha) {
                return res.send({
                    mensagem: "Preencha todos os campos!",
                    error: `Erro: \n Algum campo não foi preenchido corretamente!`,
                    success: false
                })
            }
            else {
                await Users.findOne({ email: email }, (err, data) => {
                    if (err) {
                        return res.send({
                            mensagem: "Ocorreu algum erro durante a requisição!",
                            error: `Erro: \n ${err}`,
                            success: false
                        })
                    }
                    else if (data) {
                        return res.send({
                            mensagem: "Esse email já está em uso!",
                            error: `Erro: \n ${data}`,
                            success: false
                        })
                    }
                    else {
                        await Users.create(req.body, (err, data) => {
                            if (err) {
                                return res.send({
                                    mensagem: "Ocorreu algum erro durante a requisição!",
                                    error: `Erro: \n ${err}`,
                                    success: false
                                })
                            }
                            else {
                                data.senha = undefined;
                                return res.send({
                                    data,
                                    token: createUserToken(data.id),
                                    success: true
                                })
                            }
                        })
                    }
                })
            }

        } catch (e) {
            return res.send({
                mensagem: "Ocorreu algum erro durante a requisição",
                error: `Erro: \n ${e}`,
                success: false
            })
        }

    },
    async auth(req, res) {
        try {
            let { email, senha } = await req.body;
            if (!email || !senha) {
                return res.send({
                    mensagem: "Preencha todos os campos!",
                    error: `Erro: \n Algum campo não foi preenchido corretamente!`,
                    success: false
                })
            }
            else {
                await Users.findOne({ email: email }, (err, data) => {
                    if (err) {
                        return res.send({
                            mensagem: "Ocorreu algum erro durante a requisição",
                            error: `Erro: \n ${err}`,
                            success: false
                        })
                    }
                    else if (!data) {
                        return res.send({
                            mensagem: "Usuario não registrado",
                            error: `Erro: \n Usuario não foi encontrado!`,
                            success: false
                        })
                    }
                    else {
                        bcrypt.compare(senha, data.senha, (err, same) => {
                            if (!same) {
                                return res.send({
                                    mensagem: "Senha incorreta!",
                                    error: `Erro: \n A senha que foi digitada não confere!`,
                                    success: false
                                })
                            }
                            else {
                                data.senha = undefined;
                                return res.send({
                                    data,
                                    token: createUserToken(data.id),
                                    success: true
                                })
                            }
                        })
                    }
                })
            }
        } catch (e) {
            return res.send({
                mensagem: "Ocorreu algum erro durante a requisição",
                error: `Erro: \n ${e}`,
                success: false
            })
        }
    },
    async updateData() {
        try {
            let { email, nome } = await req.body;
            let id = await req.params.id;
            if (!email || !nome) {
                return res.send({
                    mensagem: "Preencha todos os campos!",
                    error: `Erro: \n Nem todos os campos foram preenchidos!`,
                    success: false
                })
            }
            else {
                await Users.findByIdAndUpdate(id, req.body, { new: true }, (err, model) => {
                    if (err) {
                        return res.send({
                            mensagem: "Ocorreu algum erro durante a requisição",
                            error: `Erro: \n ${err}`,
                            success: false
                        })
                    }
                    else {
                        return res.send({
                            mensagem: "Usuario atualizado com sucesso!",
                            success: true
                        })
                    }
                })
            }
        } catch (e) {
            return res.send({
                mensagem: "Ocorreu algum erro durante a requisição",
                error: `Erro: \n ${e}`,
                success: false
            })
        }
    },
    async deleteData() {
        try {
            let id = await req.params.id;

            await Users.findByIdAndRemove(id , (err, data) => {
                if (err) {
                    return res.send({
                        mensagem: "Ocorreu algum erro durante a requisição",
                        error: `Erro: \n ${err}`,
                        success: false
                    })
                }
                else {
                    return res.send({
                        mensagem: "Usuario deletado com sucesso!",
                        success: true
                    })
                }
            })

        } catch (e) {
            return res.send({
                mensagem: "Ocorreu algum erro durante a requisição",
                error: `Erro: \n ${e}`,
                success: false
            })
        }
    }
}