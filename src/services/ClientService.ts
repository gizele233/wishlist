import { clientRepository } from "../repositories/clientRepository";
import { WishlistService } from "./WishlistService";


export class ClientService{
    async createClient({res, name, email_address}:any){
        const clientAlreadyExists = await clientRepository.findOne({where: {email_address: email_address}});
        if(clientAlreadyExists){
            return res.status(404).send({message: 'There is already a customer registered with that email address'});
        }

        const newClient = clientRepository.create({name, email_address})
        await clientRepository.save(newClient);

        let client_id = newClient.client_id;
        const createWishlistService = new WishlistService();
        await createWishlistService.createWishlist({res, client_id});
        
        return newClient;
    }

    async listCLient(){
        const clients = await clientRepository.find({});
        return clients;
    }

    async deleteClient({res, client_id}: any){
        const clientToRemove = await clientRepository.findOneBy({
            client_id: client_id
        });

        if(!clientToRemove){
            return res.status(404).send({message: 'There is no customer with this id'});
        }
        
        await clientRepository.remove(clientToRemove);
        return clientToRemove; 
    }

    async updateClient({res, client_id, name, email_address}: any){
        const clientUpdate = await clientRepository.findOneBy({
            client_id: client_id
        });

        if(!clientUpdate){
            return res.status(404).send({message: 'There is no customer with this id'})
        }
        
        clientUpdate.name = name;
        clientUpdate.email_address = email_address;

        await clientRepository.save(clientUpdate);
        return clientUpdate;
    }
}