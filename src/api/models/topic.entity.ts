import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, DeleteDateColumn, JoinTable, ManyToMany,ManyToOne, OneToMany, UpdateDateColumn } from 'typeorm';
import Category from "./category.entity";
import User from './user.entity';
import Comment from './comment.entity';


@Entity()
class Topic {

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

    @Column()
    public likes: number;
    
    @ManyToMany( () => Category, (category: Category ) => category.topics)
    @JoinTable()
    public categories: Category[];
    
    @ManyToOne( () => User, (auteur: User) => auteur.topics)
    public auteur: User;
   
    @OneToMany( () => Comment, (comment: Comment) => comment.topic)
    public comments_topic: Comment[];

}

export default Topic;