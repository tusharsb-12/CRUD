import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PORT } from './config/constants';
import BasicResolver from './resolvers/basic';
import BlogResolver from './resolvers/blog';

// Entities
import Blog from './entity/Blog';

const main = async () => {
    try {
        // Database connection
        await createConnection({
            type: 'postgres',
            host: 'localhost',
            database: 'crud-db',
            port: 5432,
            username: 'postgres',
            password: '1208',
            synchronize: true,
            entities: [Blog],
        });
        console.log('Database connected');

        // Express app
        const app = express();

        // Graph QL
        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [BasicResolver, BlogResolver],
                validate: false,
            }),
            context: (req: express.Request, res: express.Response) => ({
                req,
                res,
            }),
        });

        await apolloServer.start();
        apolloServer.applyMiddleware({ app });

        app.listen(PORT, () => console.log(`Listening to localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

main();
