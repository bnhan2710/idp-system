import { User } from '../../user/entities/user.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { BaseEntity } from '../../shared/base/base.entitiy';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity({
  name: 'roles',
})
export class Role extends BaseEntity{
  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'is_editable',
    type: 'boolean',
    default: true,
  })
  isEditable: boolean;

  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions?: Permission[];

}