import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn, ManyToOne, OneToMany } from '../../../node_modules/typeorm/index';
import Topic from "./topic.entity";
import User from './user.entity';


@Entity()
class Comment
{

    @PrimaryGeneratedColumn()
    public id?: number;

    @CreateDateColumn()
    public date_comment : Date;

    @Column()
    public message: string;

    @ManyToOne( () => User, (auteur: User) => auteur.comments)
    public auteur: User;

    @ManyToOne( () => Topic, (topic: Topic) => topic.comments_topic)
    public topic: Topic;

}

export default Comment;