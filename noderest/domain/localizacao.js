class Localizacao {

    constructor(lat,lon) {
        this.id = 0;
        this.UsuarioId = 1;
        this.lat=lat;
        this.lon=lon;
    }

    static buscar(id) {
        let sql = `SELECT lat, lon FROM Localizacao WHERE UsuarioId = '${id}' ORDER BY id DESC LIMIT 1`;
        return sql;
    }
    static inserirLocalizacao(lat, lon) {
        let sql = `INSERT INTO Localizacao(UsuarioId, lat, lon) VALUES ('1','${lat}', '${lon}')`;
        return sql;
    }
}


module.exports = Localizacao;