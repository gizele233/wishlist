"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
const typeorm_1 = require("typeorm");
const Client_1 = require("./Client");
const Product_1 = require("./Product");
let Wishlist = class Wishlist {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Wishlist.prototype, "wishlist_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Client_1.Client, (client) => client.wishlist, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", Client_1.Client)
], Wishlist.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Product_1.Product, product => product.wishlists),
    (0, typeorm_1.JoinTable)({
        name: 'product_wishlist',
        joinColumn: {
            name: 'wishlist_id',
            referencedColumnName: 'wishlist_id'
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'product_id'
        },
    }),
    __metadata("design:type", Array)
], Wishlist.prototype, "products", void 0);
Wishlist = __decorate([
    (0, typeorm_1.Entity)('wishlists')
], Wishlist);
exports.Wishlist = Wishlist;
