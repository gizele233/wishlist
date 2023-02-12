"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const ClientService_1 = require("../services/ClientService");
class ClientController {
    async createClient(req, res) {
        const { name, email_address } = req.body;
        try {
            const createClientService = new ClientService_1.ClientService();
            const client = await createClientService.createClient({ res, name, email_address });
            return res.status(201).json(client);
        }
        catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    }
    async listClient(req, res) {
        try {
            const listClientService = new ClientService_1.ClientService();
            const listClient = await listClientService.listCLient();
            return res.status(200).json(listClient);
        }
        catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    }
    async listClientById(req, res) {
        const { client_id } = req.params;
        try {
            const listClientService = new ClientService_1.ClientService();
            const listClient = await listClientService.listClientById({ res, client_id });
            return res.status(200).json(listClient);
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async deleteClient(req, res) {
        const { client_id } = req.params;
        try {
            const deleteClientService = new ClientService_1.ClientService();
            const clientToRemove = await deleteClientService.deleteClient({ res, client_id });
            return res.status(204).json(clientToRemove);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    }
    async updateClient(req, res) {
        const { name, email_address } = req.body;
        const { client_id } = req.params;
        try {
            const updateClientService = new ClientService_1.ClientService();
            const clientUpdate = await updateClientService.updateClient({ res, client_id, name, email_address });
            return res.status(204).json(clientUpdate);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    }
}
exports.ClientController = ClientController;
