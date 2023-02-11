import { Connection } from "../connection";
import { Wishlist } from "../entities/Wishlist";

export const wishlistRepository = Connection.getRepository(Wishlist);

