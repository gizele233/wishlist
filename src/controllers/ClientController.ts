import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";


export class ClientController{
    async createClient(req: Request, res: Response){
        const {name, email_address} = req.body;

        try{
            const createClientService = new ClientService();
            const client = await createClientService.createClient({name, email_address});
            return res.status(client.status).json(client.message);
        } catch(error){
            return res.status(500).json({status: 500, message: 'Internal Server Error'})
        }
        
    }

    async listClient(req: Request, res: Response){
        try{
            const listClientService = new ClientService();
            const listClient = await listClientService.listCLient();
            return res.status(listClient.status).json(listClient.message);
        } catch(error){
            return res.status(500).json({status: 500, message: 'Internal Server Error'})
        }
        
    }

    async listClientById(req: Request, res: Response){
        const {client_id} = req.params;
        try{
            const listClientService = new ClientService();
            const listClient = await listClientService.listClientById({client_id});
            return res.status(listClient.status).json(listClient.message);
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }

    async deleteClient(req: Request, res: Response){
        const {client_id} = req.params;

        try{
            const deleteClientService = new ClientService();
        
            const clientToRemove = await deleteClientService.deleteClient({client_id});
            return res.status(clientToRemove.status).json(clientToRemove.message);
            
        } catch(error){
            console.log(error)
            return res.status(500).json({status: 500, message: 'Internal Server Error'})
        }
    }

    async updateClient(req: Request, res: Response){

        const {name, email_address} = req.body;
        const {client_id} = req.params;

        try{
            const updateClientService = new ClientService();
        
            const clientUpdate = await updateClientService.updateClient({client_id, name, email_address});
            return res.status(clientUpdate.status).json(clientUpdate.message);
            
        } catch(error){
            console.log(error)
            return res.status(500).json({status: 500, message: 'Internal Server Error'})
        }
    }
}