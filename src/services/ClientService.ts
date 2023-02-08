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
}