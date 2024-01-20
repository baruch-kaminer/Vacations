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
const crypto = require('crypto');


server.use(expressRateLimit({
    max: 50, 
    windowMs: 1000, 
    message: 'Attack attempt detected'
}));

server.use(cors({ origin: appConfig.siteUrl || 'https://my-vacations-2856224fbe83.herokuapp.com/' } ));

// server.use(helmet());

server.use( express.json());

server.use(expressFileUpload({
    createParentPath: true
}));


server.use(sanitaize);

// server.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' https://my-vacations-4a8ac79fda0e.herokuapp.com;");
//   next();
// });

// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://my-vacations-2856224fbe83.herokuapp.com');
//   next();
// });

// server.use(function(req, res, next) {
//   res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com;");
//    next();
// });

// server.use(function(req, res, next) {
//   const nonce = crypto.randomBytes(16).toString('base64');
//   res.setHeader("Content-Security-Policy", `default-src 'self'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com 'nonce-${nonce}';`);
//   return next();
// });




server.use(express.static(path.join(__dirname, '..', '..', 'Frontend', 'build')));
server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'Frontend', 'build', 'index.html'));
});
server.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'Frontend', 'build', 'index.html'));
});

// app.get("/*", function (req, res) {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// }) 


server.use('/api', authController);

server.use('/api', vacationsController);

server.use('/api', followController);

server.use('*', routeNotFound);

server.use(catchAll);

server.listen(process.env.PORT || appConfig.port || 'https://ny-vacations-4a8ac79fda0e.herokuapp.com/' , () => console.log(`Listening to http://localhost:${appConfig.port}`))