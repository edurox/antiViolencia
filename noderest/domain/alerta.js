class Alerta {

    constructor() {
        this.id = 0;
        this.UsuarioId = 1;
    }

    static buscar(id) {
        let sql = `SELECT * FROM Alerta WHERE UsuarioId = '${id}'`;
        return sql;
    }
    static inserir(usuarioId) {
        let sql = `INSERT INTO Alerta(UsuarioId) VALUES ('${usuarioId}')`;
        return sql;
    }
}


module.exports = Alerta;