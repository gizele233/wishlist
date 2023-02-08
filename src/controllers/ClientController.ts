import { Request, Response } from "express";
import { clientService } from "../services/clientService";


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
            const createClientService = new clientService();
        
            const client = await createClientService.createClient({name, email_address});
            return res.status(201).json(client)
            
        } catch(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }
}