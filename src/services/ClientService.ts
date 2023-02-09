import { clientRepository } from "../repositories/clientRepository";


export class ClientService{
    async createClient({name, email_address}:any){
        const clientAlreadyExists = await clientRepository.findOne({where: {email_address: email_address}});
        if(clientAlreadyExists){
            throw new Error("Já existe um cliente cadastrado com esse endereço de email");
        }

        const newClient = clientRepository.create({name, email_address})
        await clientRepository.save(newClient);
        return newClient;

    }

    async listCLient(){
        const clients = await clientRepository.find({
            // relations:{
            //     wishlist: true
            // }
        })

        return clients
    }

    async deleteClient({res, client_id}: any){
        const clientToRemove = await clientRepository.findOneBy({
            client_id: client_id
        })

        if(!clientToRemove){
            return res.status(404).json({message: 'There is no customer with this id'})
        }
        
        await clientRepository.remove(clientToRemove)

        return clientToRemove 
    }

    async updateClient({res, client_id, name, email_address}: any){
        const clientUpdate = await clientRepository.findOneBy({
            client_id: client_id
        })

        if(!clientUpdate){
            return res.status(404).json({message: 'There is no customer with this id'})
        }
        
        clientUpdate.name = name;
        clientUpdate.email_address = email_address;

        await clientRepository.save(clientUpdate)

        return clientUpdate 
    }
}