
import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import PostsController from './api/Controllers/blog/posts.controller';
import validateEnv from './utils/validateEnv';
import { createConnection } from 'typeorm';
 
import config from './ormconfig';
import AuthenticationController from '../src/api/Controllers/authentication.controller';



validateEnv();

(async () => {
    try {
      await createConnection(config);
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    const app = new App([

        new PostsController(),
        new AuthenticationController(),
    ]
    );
    
    //app.connectToTheDatabase();
    app.listen();
    app.get();
    
})();



