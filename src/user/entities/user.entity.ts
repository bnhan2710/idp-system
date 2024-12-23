import { 
    Entity,
    Column,
    JoinTable,
    ManyToMany,
} from "typeorm";
import { BaseEntity } from "../../shared/base/base.entitiy"; 
import { Role } from "../../role/entities/role.entity";

@Entity({
    name: 'users'
})
export class User extends BaseEntity {
    
    @Column({
        name: 'username',
        nullable:false,
        unique:true,
    })
    username:string

    @Column({
        name: 'email',
        type:'varchar',
        nullable:true,
        unique:true,
    })
    email:string

    @Column({
        name: 'full_name',
        nullable:true
    })
    fullName: string

    @Column({
        name: 'password',
        type: 'varchar',
        nullable: false
    })
    password:string

    @Column({
        name: 'birthday',
        nullable: true,
    })
    birthDay: Date

    @Column({
        name: 'phone_number',
        nullable: true,
      })
    phoneNumber: string;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
      name: 'users_roles',
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'role_id',
        referencedColumnName: 'id',
      },
    })
    roles?: Role[];
}
