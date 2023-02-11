"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default1676059969351 {
    constructor() {
        this.name = 'default1676059969351';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`products\` (\`product_id\` int NOT NULL AUTO_INCREMENT, \`price\` double NOT NULL, \`image\` text NOT NULL, \`brand\` text NOT NULL, \`title\` text NOT NULL, \`review_score\` double NOT NULL, PRIMARY KEY (\`product_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wishlists\` (\`wishlist_id\` int NOT NULL AUTO_INCREMENT, \`client_id\` int NULL, UNIQUE INDEX \`REL_467c5834a251a0bd512dba785d\` (\`client_id\`), PRIMARY KEY (\`wishlist_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clients\` (\`client_id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`email_address\` text NOT NULL, PRIMARY KEY (\`client_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_wishlist\` (\`wishlist_id\` int NOT NULL, \`product_id\` int NOT NULL, INDEX \`IDX_89dc0a67d7b388f1d79aa3d763\` (\`wishlist_id\`), INDEX \`IDX_49b9f34ac2e43a9972123090c3\` (\`product_id\`), PRIMARY KEY (\`wishlist_id\`, \`product_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`wishlists\` ADD CONSTRAINT \`FK_467c5834a251a0bd512dba785d8\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`client_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` ADD CONSTRAINT \`FK_89dc0a67d7b388f1d79aa3d7635\` FOREIGN KEY (\`wishlist_id\`) REFERENCES \`wishlists\`(\`wishlist_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` ADD CONSTRAINT \`FK_49b9f34ac2e43a9972123090c36\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`product_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` DROP FOREIGN KEY \`FK_49b9f34ac2e43a9972123090c36\``);
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` DROP FOREIGN KEY \`FK_89dc0a67d7b388f1d79aa3d7635\``);
        await queryRunner.query(`ALTER TABLE \`wishlists\` DROP FOREIGN KEY \`FK_467c5834a251a0bd512dba785d8\``);
        await queryRunner.query(`DROP INDEX \`IDX_49b9f34ac2e43a9972123090c3\` ON \`product_wishlist\``);
        await queryRunner.query(`DROP INDEX \`IDX_89dc0a67d7b388f1d79aa3d763\` ON \`product_wishlist\``);
        await queryRunner.query(`DROP TABLE \`product_wishlist\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
        await queryRunner.query(`DROP INDEX \`REL_467c5834a251a0bd512dba785d\` ON \`wishlists\``);
        await queryRunner.query(`DROP TABLE \`wishlists\``);
        await queryRunner.query(`DROP TABLE \`products\``);
    }
}
exports.default1676059969351 = default1676059969351;
