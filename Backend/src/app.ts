import express from "express";
import appConfig from "./2-utils/AppConfig";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import cors from "cors"
import authController from "./6-controllers/auth-controller";
import vacationsController from "./6-controllers/vacation-controller";
import followController from "./6-controllers/follow-controller";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import sanitaize from "./3-middleware/sanitize";
import expressFileUpload from "express-fileupload"
import path from "path";

const server = express();


server.use(expressRateLimit({
    max: 50, 
    windowMs: 1000, 
    message: 'Attack attempt detected'
}));

server.use(cors({ origin: appConfig.siteUrl || 'https://my-vacations-2856224fbe83.herokuapp.com/' } ));

const corsOptions = {
  origin: 'https://my-vacations-2856224fbe83.herokuapp.com/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type', 
};
appConfig.isProduction && server.use(cors(corsOptions ));

// server.use(helmet());

server.use( express.json());

server.use(expressFileUpload({
    createParentPath: true
}));


server.use(sanitaize);


  server.use('/api', authController);
  
  server.use('/api', vacationsController);

  server.use('/api', followController);

  server.use(express.static(path.join(__dirname, '..', '..', 'Frontend', 'build')));

  server.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'Frontend', 'build', 'index.html'));
  });



  server.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'Frontend', 'build', 'index.html'));
  });

  server.use('*', routeNotFound);

  server.use(catchAll);

  server.listen(process.env.PORT || appConfig.port || 'https://ny-vacations-4a8ac79fda0e.herokuapp.com/' , () => console.log(`Listening to http://localhost:${appConfig.port}`))