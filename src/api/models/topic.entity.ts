import { Column, Entity, getRepository, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, DeleteDateColumn, JoinTable, ManyToMany,ManyToOne, OneToMany, UpdateDateColumn } from 'typeorm';
import Category from "./category.entity";
import User from './user.entity';
import Comment from './comment.entity';
import { type } from 'node:os';


@Entity()
class Topic {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;

    @Column({
        type : "int",
        default : 0
    })
    likes: number;
    
    @ManyToOne( () => Category, (category: Category ) => category.topics)
    categories: Category;
    
    @ManyToOne( () => User, (user: User) => user.topics)
    user: User;
   
    @OneToMany( () => Comment, (comment: Comment) => comment.topic)
    comments: Comment[];

}

export default Topic;
