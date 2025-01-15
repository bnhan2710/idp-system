import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateReferenceRolePermisison1736952023572 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "roles_permissions",
                columns: [
                    {
                        name: "role_id",
                        type: "uuid",
                    },
                    {
                        name: "permission_id",
                        type: "uuid",
                    },
                ],
            })
        );
        await queryRunner.createForeignKey(
            "roles_permissions",
            new TableForeignKey({
                columnNames: ["role_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "roles_permissions",
            new TableForeignKey({
                columnNames: ["permission_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('roles_permissions', [
            new TableForeignKey({
              columnNames: ['role_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'roles',
            }),
            new TableForeignKey({
              columnNames: ['permission_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'permissions',
            }),
          ]);
          await queryRunner.dropTable('roles_permissions')
    }

}
