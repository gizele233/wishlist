const connection = require("./connection");

const getAll = async () => {
    const [clients] = await connection.execute('SELECT * FROM clients');
    return clients;
};

const createClient = async (client) => {
    const {name, email_address} = client;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO clients(name, email_address, created_at) VALUES (?, ?, ?)';
    const [createdClient] = await connection.execute( query, [name, email_address, dateUTC]);

    return {insertId: createdClient.insertId};
};

module.exports = {
    getAll,
    createClient
};