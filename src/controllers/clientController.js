const clientModel = require('../models/clientModel');

const getAll = async (request, response) => {
    const clients = await clientModel.getAll();

    return response.status(200).json(clients);
};

const createClient = async (request, response) => {
    const createdClient = await clientModel.createClient(request.body);
    return response.status(201).json(createdClient);
}

module.exports = {
    getAll,
    createClient
};