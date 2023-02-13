"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const ClientService_1 = require("../services/ClientService");
class ClientController {
    async createClient(req, res) {
        const { name, email_address } = req.body;
        try {
            const createClientService = new ClientService_1.ClientService();
            const client = await createClientService.createClient({ name, email_address });
            return res.status(client.status).json(client.message);
        }
        catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    }
    async listClient(req, res) {
        try {
            const listClientService = new ClientService_1.ClientService();
            const listClient = await listClientService.listCLient();
            return res.status(listClient.status).json(listClient.message);
        }
        catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    }
    async listClientById(req, res) {
        const { client_id } = req.params;
        try {
            const listClientService = new ClientService_1.ClientService();
            const listClient = await listClientService.listClientById({ client_id });
            return res.status(listClient.status).json(listClient.message);
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async deleteClient(req, res) {
        const { client_id } = req.params;
        try {
            const deleteClientService = new ClientService_1.ClientService();
            const clientToRemove = await deleteClientService.deleteClient({ client_id });
            return res.status(clientToRemove.status).json(clientToRemove.message);
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
            const clientUpdate = await updateClientService.updateClient({ client_id, name, email_address });
            return res.status(clientUpdate.status).json(clientUpdate.message);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    }
}
exports.ClientController = ClientController;
