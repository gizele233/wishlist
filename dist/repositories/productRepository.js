"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
const Product_1 = require("../entities/Product");
exports.productRepository = connection_1.Connection.getRepository(Product_1.Product);
