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

export const category1 = new Category();
category1.nom = "animals";

export const category2 = new Category();
category2.nom = "zoo";


export default Category;