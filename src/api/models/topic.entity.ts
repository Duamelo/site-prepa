import { Column, Entity, getRepository, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, DeleteDateColumn, JoinTable, ManyToMany,ManyToOne, OneToMany, UpdateDateColumn } from 'typeorm';
import Category from "./category.entity";
import User from './user.entity';
import Comment from './comment.entity';
import {category1, category2 } from './category.entity';


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

    @Column()
    likes: number;
    
    @ManyToMany( () => Category, (category: Category ) => category.topics)
    @JoinTable()
    categories: Category[];
    
    @ManyToOne( () => User, (user: User) => user.topics)
    user: User;
   
    @OneToMany( () => Comment, (comment: Comment) => comment.topic)
    comments: Comment[];

}

export const topic1 = new Topic();
topic1.content = "azertyui";
topic1.title = "scvbn";
topic1.likes = 0;
topic1.categories = [category1, category2];

export default Topic;
