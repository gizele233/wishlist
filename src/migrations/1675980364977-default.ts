import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675980364977 implements MigrationInterface {
    name = 'default1675980364977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` DROP FOREIGN KEY \`FK_89dc0a67d7b388f1d79aa3d7635\``);
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` ADD CONSTRAINT \`FK_89dc0a67d7b388f1d79aa3d7635\` FOREIGN KEY (\`wishlist_id\`) REFERENCES \`wishlists\`(\`wishlist_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` DROP FOREIGN KEY \`FK_89dc0a67d7b388f1d79aa3d7635\``);
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` ADD CONSTRAINT \`FK_89dc0a67d7b388f1d79aa3d7635\` FOREIGN KEY (\`wishlist_id\`) REFERENCES \`wishlists\`(\`wishlist_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
