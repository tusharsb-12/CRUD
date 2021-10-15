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
    ): Promise<Blog | undefined> {
        const blog = Blog.create(data);
        await blog.save();
        return blog;
    }

    // Update a blog
    @Mutation(() => Blog, { nullable: true })
    async updateBlog(
        @Arg('data', () => CreateBlogInput) data: CreateBlogInput,
        @Arg('id') id: number
    ): Promise<Blog | undefined> {
        await Blog.update(id, data);
        const blog = await Blog.findOne({ id });
        return blog;
    }

    // Delete a blog
    @Mutation(() => Blog)
    async deleteBlog(@Arg('id') id: number): Promise<Blog | undefined> {
        const blog = await Blog.findOne({ id });
        await Blog.delete(id);
        return blog;
    }
}

export default BlogResolver;
