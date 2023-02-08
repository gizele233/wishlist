import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675821302670 implements MigrationInterface {
    name = 'default1675821302670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_wishlist\` (\`product_id\` int NOT NULL, \`wishlist_id\` int NOT NULL, INDEX \`IDX_49b9f34ac2e43a9972123090c3\` (\`product_id\`), INDEX \`IDX_89dc0a67d7b388f1d79aa3d763\` (\`wishlist_id\`), PRIMARY KEY (\`product_id\`, \`wishlist_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` ADD CONSTRAINT \`FK_49b9f34ac2e43a9972123090c36\` FOREIGN KEY (\`product_id\`) REFERENCES \`wishlists\`(\`wishlist_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` ADD CONSTRAINT \`FK_89dc0a67d7b388f1d79aa3d7635\` FOREIGN KEY (\`wishlist_id\`) REFERENCES \`products\`(\`product_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` DROP FOREIGN KEY \`FK_89dc0a67d7b388f1d79aa3d7635\``);
        await queryRunner.query(`ALTER TABLE \`product_wishlist\` DROP FOREIGN KEY \`FK_49b9f34ac2e43a9972123090c36\``);
        await queryRunner.query(`DROP INDEX \`IDX_89dc0a67d7b388f1d79aa3d763\` ON \`product_wishlist\``);
        await queryRunner.query(`DROP INDEX \`IDX_49b9f34ac2e43a9972123090c3\` ON \`product_wishlist\``);
        await queryRunner.query(`DROP TABLE \`product_wishlist\``);
    }

}
