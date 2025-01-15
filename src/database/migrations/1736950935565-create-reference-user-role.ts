import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateReferenceUserRole1736950935565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_roles",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "role_id",
                        type: "uuid",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "users_roles",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "users_roles",
            new TableForeignKey({
                columnNames: ["role_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('users_roles', [
            new TableForeignKey({
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            }),
            new TableForeignKey({
              columnNames: ['role_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'roles',
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            }),
          ]);

        await queryRunner.dropTable("users_roles");
    }
}
