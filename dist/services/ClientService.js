"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const clientRepository_1 = require("../repositories/clientRepository");
const WishlistService_1 = require("./WishlistService");
class ClientService {
    async createClient({ res, name, email_address }) {
        const clientAlreadyExists = await clientRepository_1.clientRepository.findOne({ where: { email_address: email_address } });
        if (clientAlreadyExists) {
            return res.status(404).json("There is already a customer registered with that email address");
        }
        const newClient = clientRepository_1.clientRepository.create({ name, email_address });
        await clientRepository_1.clientRepository.save(newClient);
        let client_id = newClient.client_id;
        const createWishlistService = new WishlistService_1.WishlistService();
        await createWishlistService.createWishlist({ res, client_id });
        return newClient;
    }
    async listCLient() {
        const clients = await clientRepository_1.clientRepository.find({});
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
