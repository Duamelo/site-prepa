import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, DeleteDateColumn, JoinTable, ManyToMany,ManyToOne, UpdateDateColumn } from '../../../node_modules/typeorm/index';
import Category from "../models/category.entity";
import User from '../models/user.entity';

@Entity()
class Post {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @CreateDateColumn()
    public createdDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

    @DeleteDateColumn()
    public deletedDate: Date;
    
    @ManyToMany( () => Category, (category: Category ) => category.posts)
    @JoinTable()
    public categories: Category[];
    
    @ManyToOne( () => User, (auteur: User) => auteur.posts)
    public auteur: User;
}

export default Post;