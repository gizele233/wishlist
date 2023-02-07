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

const deleteClient = async(id) => {
    const removedClient = await connection.execute('DELETE FROM clients WHERE client_id = ?', [id]);
    return removedClient;
};

const updateClient = async(id, client) => {
    const query = 'UPDATE clients SET name = ?, email_address = ? WHERE client_id=?';
    const {name, email_address} = client;

    const [updateClient] = await connection.execute(query, [name, email_address, id]);
    return updateClient;
};

module.exports = {
    getAll,
    createClient,
    deleteClient,
    updateClient
};