import { Connection } from "../connection";
import { Product } from "../entities/Product";

export const productRepository = Connection.getRepository(Product)

