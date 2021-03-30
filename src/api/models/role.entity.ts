import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from '../../../node_modules/typeorm/index';
import User from '../models/user.entity';

@Entity()

class Role
{
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    nom_role: string;

    @OneToMany( ()=> User, (user: User) => user.role)
    roles: Role[];

}


export default Role;