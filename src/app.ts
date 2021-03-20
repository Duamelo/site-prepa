
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as Controller from '../src/interfaces/controller.interface';
import errorMiddleware from '../src/api/middlewares/error.middleware';



class App {
    public app: express.Application;
    //public port: number;

    constructor(controllers)
    {
        this.app = express();
        //this.port = port;

       // this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }


    public listen()
    {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    public getServer() 
    {
        return this.app;
    }
    public get()
    {
        this.app.get('/', (request, response) => {
            response.send('Le serveur est bien configuré, bravo!!');
        })
    }
    private initializeMiddlewares()
    {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    private initializeErrorHandling()
    {
        this.app.use(errorMiddleware);
        
    }

    private initializeControllers(controllers)
    {
        controllers.forEach((controller) => {
            this.app.use('/',controller.router);
        });
    }



}



export default App;