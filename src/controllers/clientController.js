const clientModel = require('../models/clientModel');

const getAll = async (request, response) => {
    const clients = await clientModel.getAll();

    return response.status(200).json(clients);
};

module.exports = {
    getAll
};