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

const server = express();

server.use(expressRateLimit({
    max: 50, 
    windowMs: 1000, 
    message: 'Attack attempt detected'
}));

server.use(cors({ origin: appConfig.siteUrl } ));

server.use(helmet());

server.use( express.json());

server.use(expressFileUpload({
    createParentPath: true
}));


server.use(sanitaize);

server.use('/api', authController);

server.use('/api', vacationsController);

server.use('/api', followController);

server.use('*', routeNotFound);

server.use(catchAll);

server.listen(process.env.PORT || 'https://ny-vacations-4a8ac79fda0e.herokuapp.com/' ||appConfig.port, () => console.log(`Listening to http://localhost:${appConfig.port}`))