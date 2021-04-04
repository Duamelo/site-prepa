import { Column , Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToMany } from '../../../node_modules/typeorm/index';
import Topic from './topic.entity';
import { getRepository}  from 'typeorm';

@Entity()
class Category 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @ManyToMany( () => Topic, (topic: Topic) => topic.categories)
    topics: Topic[];
}

export default Category;