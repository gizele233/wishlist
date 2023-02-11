"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
const Wishlist_1 = require("../entities/Wishlist");
exports.wishlistRepository = connection_1.Connection.getRepository(Wishlist_1.Wishlist);
