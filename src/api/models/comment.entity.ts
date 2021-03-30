import { Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn, ManyToOne, OneToMany } from '../../../node_modules/typeorm/index';
import Topic from "./topic.entity";
import User from './user.entity';


@Entity()
class Comment
{

    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    date_comment : Date;

    @Column()
    message: string;

    @Column()
    topicId: number;

    @Column()
    userId: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;

    @Column()
    likes : number;

    @ManyToOne( () => User, (user: User) => user.comments)
    user: User;

    @ManyToOne( () => Topic, (topic: Topic) => topic.comments)
    topic: Topic;

}

export default Comment;