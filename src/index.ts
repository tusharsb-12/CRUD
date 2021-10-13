import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import dbConfig from './config/ormconfig';
import { PORT } from './config/constants';
import BasicResolver from './resolvers/basic';

const main = async () => {
    try {
        // Database connection
        await createConnection(dbConfig);
        console.log('Database connected');

        // Express app
        const app = express();

        // Graph QL
        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [BasicResolver],
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
