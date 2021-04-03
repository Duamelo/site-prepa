import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn, ManyToOne, OneToMany } from '../../../node_modules/typeorm/index';
import Role from '../models/role.entity';
import Topic from './topic.entity';
import Comment from './comment.entity';


@Entity()
class User
{
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column()
    public nom: string;

    @Column()
    public prenom: string;

    @Column()
    public date_naissance: string;

    @Column()
    public mot_de_passe: string;
    
    @Column()
    public email: string;

    @Column()
    public telephone: number;

    @Column()
    public pays: string;

    @CreateDateColumn()
    public createdDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

    @ManyToOne( ()=> Role, (role : Role) => role.roles)
    public role: Role;

    @OneToMany( () => Topic, (topic: Topic) => topic.user)
    public topics: Topic[];

    @OneToMany( () => Comment, (comment: Comment) => comment.userId)
    public comments: Comment[];
}

export default User;