"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientRepository_1 = require("../repositories/clientRepository");
class ClientService {
    async createClient({ name, email_address }) {
        const clientAlreadyExists = await clientRepository_1.clientRepository.findOne({ where: { email_address: email_address } });
        if (clientAlreadyExists) {
            throw new Error("Já existe um cliente cadastrado com esse endereço de email");
        }
        const newClient = clientRepository_1.clientRepository.create({ name, email_address });
        await clientRepository_1.clientRepository.save(newClient);
        return newClient;
    }
    async listCLient() {
        const clients = await clientRepository_1.clientRepository.find({
        // relations:{
        //     wishlist: true
        // }
        });
        return clients;
    }
    async deleteClient({ res, client_id }) {
        const clientToRemove = await clientRepository_1.clientRepository.findOneBy({
            client_id: client_id
        });
        if (!clientToRemove) {
            return res.status(404).json({ message: 'There is no customer with this id' });
        }
        await clientRepository_1.clientRepository.remove(clientToRemove);
        return clientToRemove;
    }
    async updateClient({ res, client_id, name, email_address }) {
        const clientUpdate = await clientRepository_1.clientRepository.findOneBy({
            client_id: client_id
        });
        if (!clientUpdate) {
            return res.status(404).json({ message: 'There is no customer with this id' });
        }
        clientUpdate.name = name;
        clientUpdate.email_address = email_address;
        await clientRepository_1.clientRepository.save(clientUpdate);
        return clientUpdate;
    }
}
exports.ClientService = ClientService;
