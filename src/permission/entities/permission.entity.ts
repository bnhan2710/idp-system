import { 
    Entity,
    Column,
    ManyToMany    
} from 'typeorm';
import { BaseEntity } from '../../shared/base/base.entitiy'; 
import { Role } from '../../role/entities/role.entity';

@Entity({name: 'permission'})
export class Permission extends BaseEntity{
    @Column({
        name: 'name',
        type: 'varchar',
        nullable: false,
        unique: true
    })
    name: string

    @Column({
        name: 'description',
        type: 'varchar',
        nullable: true,
      })
    description: string;

    @ManyToMany(() => Role, (role) => role.permissions)
    roles?: Role[];
}
