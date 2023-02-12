import { clientRepository } from "../repositories/clientRepository";
import { WishlistService } from "./WishlistService";


export class ClientService{
    async createClient({name, email_address}:any){
        const clientAlreadyExists = await clientRepository.findOne({where: {email_address: email_address}});
        if(clientAlreadyExists){
            return {
                status: 404, 
                message: {
                    status: 404,
                    message: 'There is already a customer registered with that email address'
                }
            };
        }

        const newClient = clientRepository.create({name, email_address})
        await clientRepository.save(newClient);

        let client_id = newClient.client_id;
        const createWishlistService = new WishlistService();
        await createWishlistService.createWishlist({client_id});
        
        return {status: 201, message: newClient};
    }

    async listCLient(){
        const clients = await clientRepository.find({});
        return {status:200, message: clients};
    }

    async listClientById({client_id}: any){
        const clients = await clientRepository.findOneBy({client_id: client_id});
        
        if(!clients){
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'There is no client with this id'
                }
            };
        }

        return {status: 200, message: clients};
    }

    async deleteClient({client_id}: any){
        const clientToRemove = await clientRepository.findOneBy({
            client_id: client_id
        });

        if(!clientToRemove){
            return {
                status: 404, 
                message: {
                    status: 404,
                    message: 'There is no customer with this id'
                }
            };
        }
        
        await clientRepository.remove(clientToRemove);
        return {status: 204, message: clientToRemove}; 
    }

    async updateClient({client_id, name, email_address}: any){
        const clientUpdate = await clientRepository.findOneBy({
            client_id: client_id
        });

        if(!clientUpdate){
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

        await clientRepository.save(clientUpdate);
        return {status: 204, message: clientUpdate};
    }
}