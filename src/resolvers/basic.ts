import { Query, Resolver } from 'type-graphql';

@Resolver()
export default class PostResolver {
    @Query()
    hello(): string {
        return 'Hello, World';
    }
}
