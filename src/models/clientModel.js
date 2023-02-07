const connection = require("./connection");

const getAll = async () => {
    const [clients] = await connection.execute('SELECT * FROM clients');
    return clients;
};

module.exports = {
    getAll
}