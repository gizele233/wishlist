import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";


export class ClientController{
    async createClient(req: Request, res: Response){
        const {name, email_address} = req.body;

        try{
            const createClientService = new ClientService();
            const client = await createClientService.createClient({res, name, email_address});

            return res.status(201).send(client)
            
        } catch(error){
            return res.status(500).send({message: 'Internal Server Error'})
        }
        
    }

    async listClient(req: Request, res: Response){
        try{
            const listClientService = new ClientService();
            const listClient = await listClientService.listCLient();
            return res.status(200).send(listClient)
        } catch(error){
            return res.status(500).send({message: 'Internal Server Error'})
        }
        
    }

    async deleteClient(req: Request, res: Response){
        const {client_id} = req.params;

        try{
            const deleteClientService = new ClientService();
        
            const clientToRemove = await deleteClientService.deleteClient({res, client_id});
            return res.status(204).send(clientToRemove)
            
        } catch(error){
            console.log(error)
            return res.status(500).send({message: 'Internal Server Error'})
        }
    }

    async updateClient(req: Request, res: Response){

        const {name, email_address} = req.body;
        const {client_id} = req.params;

        try{
            const updateClientService = new ClientService();
        
            const clientUpdate = await updateClientService.updateClient({res, client_id, name, email_address});
            return res.status(204).send(clientUpdate)
            
        } catch(error){
            console.log(error)
            return res.status(500).send({message: 'Internal Server Error'})
        }
    }
}