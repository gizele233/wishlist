import { Connection } from "../connection";
import { Client } from "../entities/Client";

export const clientRepository = Connection.getRepository(Client)

