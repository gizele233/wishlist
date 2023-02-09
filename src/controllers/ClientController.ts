import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";


// const getAll = async (request, response) => {
//     const clients = await clientModel.getAll();

//     return response.status(200).json(clients);
// };

// const createClient = async (request, response) => {
//     const createdClient = await clientModel.createClient(request.body);
//     return response.status(201).json(createdClient);
// };

// const deleteClient = async (request, response) => {
//     const { id } = request.params;

//     await clientModel.deleteClient(id);
//     return response.status(204).json();
// };

// const updateClient = async (request, response) => {
//     const { id } = request.params;

//     await clientModel.updateClient(id, request.body);
//     return response.status(204).json();
// };

// module.exports = {
//     getAll,
//     createClient,
//     deleteClient,
//     updateClient
// };

export class ClientController{
    async createClient(req: Request, res: Response){
        const {name, email_address} = req.body;

        try{
            const createClientService = new ClientService();
        
            const client = await createClientService.createClient({name, email_address});
            return res.status(201).json(client)
            
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }

    async listClient(req: Request, res: Response){
        try{
            const listClientService = new ClientService();
            const listClient = await listClientService.listCLient();
            return res.status(201).json(listClient)
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }

    async deleteClient(req: Request, res: Response){
        const {client_id} = req.params;

        try{
            const deleteClientService = new ClientService();
        
            const clientToRemove = await deleteClientService.deleteClient({res, client_id});
            return res.status(204).json(clientToRemove)
            
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}