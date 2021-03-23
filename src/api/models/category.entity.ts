import { Column , Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToMany } from '../../../node_modules/typeorm/index';
import Topic from './topic.entity';

@Entity()
class Category 
{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nom: string;

    @ManyToMany( () => Topic, (topic: Topic) => topic.categories)
    public topics: Topic[];
}

export default Category;