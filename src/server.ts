
import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import TopicsController from './api/Controllers/forum/topics.controller';
import validateEnv from './utils/validateEnv';
import { createConnection } from 'typeorm';
 
import config from './ormconfig';
import AuthenticationController from '../src/api/Controllers/authentication.controller';
import CommentsController from './api/Controllers/forum/comments.controller';
import UserController from './api/Controllers/user.controller';



validateEnv();

(async () => {
    try {
      await createConnection(config);
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    const app = new App([

        new TopicsController(),
        new AuthenticationController(),
        new CommentsController(),
        new UserController()
    ]
    );
    
    //app.connectToTheDatabase();
    app.listen();
    app.get();
    
})();



