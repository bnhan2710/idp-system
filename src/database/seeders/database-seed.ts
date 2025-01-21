import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';   
import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { BcryptService } from '@shared/services';
import { ConfigService } from '@nestjs/config';
import { EnvironmentKeyFactory } from '@shared/services';
import { RoleEnum } from '@common/constants/role';
import { AccessPermission } from '@common/constants/permission';

const configService = new ConfigService();
const environmentKeyFactory = new EnvironmentKeyFactory(configService);
const bcryptService = new BcryptService(environmentKeyFactory);


export default class DataBaseSeeder implements Seeder{ 

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
        ):Promise<void>{
            await dataSource.getRepository(User).save([
                {
                    name: 'Admin',
                    email: 'admin@gmail.com',
                    password: await bcryptService.hash(configService.get('ADMIN_PASSWORD')),
                },
            ]);

            await dataSource.getRepository(Role).save([
                {
                    name: RoleEnum.ADMIN,
                },
                {
                    name: RoleEnum.MEMBER,
                },
                {
                    name: RoleEnum.GUEST,
                },
            ]);

            await dataSource.getRepository(Permission).save([
                {
                    name: AccessPermission.CREATE_USER,
                },
                {
                    name: AccessPermission.VIEW_USERS,
                },
                {
                    name: AccessPermission.DELETE_USER,
                },
                {
                    name: AccessPermission.UPDATE_USER,
                },
                {
                    name: AccessPermission.CREATE_ROLE,
                },
                {
                    name: AccessPermission.VIEW_ROLES,
                },
                {
                    name: AccessPermission.DELETE_ROLE,
                },
                {
                    name: AccessPermission.UPDATE_ROLE,
                },
                {
                    name: AccessPermission.CREATE_PERMISSION,
                },
                {
                    name: AccessPermission.VIEW_PERMISSIONS,
                },
                {
                    name: AccessPermission.DELETE_PERMISSION,
                },
                {
                    name: AccessPermission.UPDATE_PERMISSION,
                }
            ]);
            
            await dataSource.getRepository(Role).findOne({ where: { name: RoleEnum.ADMIN } }).then(async (role) => {
                await dataSource.getRepository(Permission).find().then(async (permissions) => {
                    role.permissions = permissions;
                    await dataSource.getRepository(Role).save(role);
                });
            }
            );
        }

}