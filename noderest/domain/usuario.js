class Usuario {

    constructor(email,senha) {
        this.id=0;
        this.email=email;
        this.senha=senha;
    }

    static logar(email, senha) {
        let sql = `SELECT email FROM Usuario WHERE email = '${email}' and senha = '${senha}'`;
        return sql;
    }
}


module.exports = Usuario;