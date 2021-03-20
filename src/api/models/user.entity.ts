import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, ManyToMany, ManyToOne, OneToMany } from '../../../node_modules/typeorm/index';
import Role from '../models/role.entity';
import Post from './post.entity';


@Entity()
class User
{
    @PrimaryGeneratedColumn()
    public id: number;


    @Column()
    public nom: string;

    @Column()
    public prenom: string;

    @CreateDateColumn()
    public date_naissance: Date;

    @Column()
    public mot_de_passe: string;
    
    @Column()
    public email: string;

    @Column()
    public telephone: number;

    @Column()
    public pays: string;

    @ManyToOne( ()=> Role, (role : Role) => role.roles)
    public role: Role;

    @OneToMany( () => Post, (post: Post) => post.auteur)
    public posts: Post[];
}

export default User;