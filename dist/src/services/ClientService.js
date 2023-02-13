"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const clientRepository_1 = require("../repositories/clientRepository");
const WishlistService_1 = require("./WishlistService");
class ClientService {
    async createClient({ name, email_address }) {
        const clientAlreadyExists = await clientRepository_1.clientRepository.findOne({ where: { email_address: email_address } });
        if (clientAlreadyExists) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'There is already a customer registered with that email address'
                }
            };
        }
        const newClient = clientRepository_1.clientRepository.create({ name, email_address });
        await clientRepository_1.clientRepository.save(newClient);
        let client_id = newClient.client_id;
        const createWishlistService = new WishlistService_1.WishlistService();
        await createWishlistService.createWishlist({ client_id });
        return { status: 201, message: newClient };
    }
    async listCLient() {
        const clients = await clientRepository_1.clientRepository.find({});
        return { status: 200, message: clients };
    }
    async listClientById({ client_id }) {
        const clients = await clientRepository_1.clientRepository.findOneBy({ client_id: client_id });
        if (!clients) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'There is no client with this id'
                }
            };
        }
        return { status: 200, message: clients };
    }
    async deleteClient({ client_id }) {
        const clientToRemove = await clientRepository_1.clientRepository.findOneBy({
            client_id: client_id
        });
        if (!clientToRemove) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'There is no customer with this id'
                }
            };
        }
        await clientRepository_1.clientRepository.remove(clientToRemove);
        return { status: 204, message: clientToRemove };
    }
    async updateClient({ client_id, name, email_address }) {
        const clientUpdate = await clientRepository_1.clientRepository.findOneBy({
            client_id: client_id
        });
        if (!clientUpdate) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'There is no customer with this id'
                }
            };
        }
        clientUpdate.name = name;
        clientUpdate.email_address = email_address;
        await clientRepository_1.clientRepository.save(clientUpdate);
        return { status: 204, message: clientUpdate };
    }
}
exports.ClientService = ClientService;
