var jwt = require('jsonwebtoken');
require('dotenv').config();

let auth = async (req, res, next) => {
    let token_header = await req.body.token || await req.query.token || await req.headers['x-access-token'];
    if (!token_header) {
        return res.send({
            mensagem: "Autenticação recusada!",
            success: false
        })
    }
    else {
        jwt.verify(token_header, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.send({
                    mensagem: "Token Invalido!",
                    error: `Erro: \n o token enviado não requisição é invalido!`,
                    success: false
                })
            }
            else {
                res.locals.auth_data = decoded;
                return next();
            }
        })
    }
}

module.exports = auth;