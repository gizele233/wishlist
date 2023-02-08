import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675818874043 implements MigrationInterface {
    name = 'default1675818874043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wishlists\` (\`wishlist_id\` int NOT NULL AUTO_INCREMENT, \`client_id\` int NULL, UNIQUE INDEX \`REL_467c5834a251a0bd512dba785d\` (\`client_id\`), PRIMARY KEY (\`wishlist_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`product_id\` int NOT NULL AUTO_INCREMENT, \`price\` double NOT NULL, \`image\` text NOT NULL, \`brand\` text NOT NULL, \`title\` text NOT NULL, \`review_score\` double NOT NULL, PRIMARY KEY (\`product_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD \`name\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`email_address\``);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD \`email_address\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`wishlists\` ADD CONSTRAINT \`FK_467c5834a251a0bd512dba785d8\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`client_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wishlists\` DROP FOREIGN KEY \`FK_467c5834a251a0bd512dba785d8\``);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`email_address\``);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD \`email_address\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD \`name\` varchar(80) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD \`created_at\` varchar(45) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`REL_467c5834a251a0bd512dba785d\` ON \`wishlists\``);
        await queryRunner.query(`DROP TABLE \`wishlists\``);
    }

}
