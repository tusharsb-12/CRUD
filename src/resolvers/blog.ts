import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateBlogInput } from '../inputs/Blog';
import Blog from '../entity/Blog';

@Resolver()
class BlogResolver {
    // Get all blogs
    @Query(() => [Blog], { nullable: true })
    async blogs(): Promise<Blog[]> {
        const blogs = await Blog.find();
        return blogs;
    }

    // Get a blog by id
    @Query(() => Blog, { nullable: true })
    async blog(@Arg('id') id: number): Promise<Blog | undefined> {
        const blog = await Blog.findOne(id);
        return blog;
    }

    // Create a blog
    @Mutation(() => Blog)
    async createBlog(
        @Arg('data', () => CreateBlogInput) data: CreateBlogInput
    ) {
        const blog = Blog.create(data);
        await blog.save();
        return blog;
    }
}

export default BlogResolver;
