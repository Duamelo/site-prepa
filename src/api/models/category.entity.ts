import { Column , Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToMany } from '../../../node_modules/typeorm/index';
import Post from '../models/post.entity';

@Entity()
class Category 
{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nom: string;

    @ManyToMany( () => Post, (post: Post) => post.categories)
    public posts: Post[];
}

export default Category;