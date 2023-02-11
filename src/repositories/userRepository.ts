import { Connection } from "../connection";
import { User } from "../entities/User";

export const userRepository = Connection.getRepository(User);

