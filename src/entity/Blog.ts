import {
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Entity,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
class Blog extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => String)
    @Column()
    content: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}

export default Blog;
