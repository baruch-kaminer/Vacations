class AppConfig{

}

class ProductionConfig extends AppConfig {

        public isProduction = true;
        public host = 'localhost';
        public username = process.env.USERNAME;
        public password = process.env.PASSWORD;
        public database = process.env.DATABASE;
        public port = process.env.PORT;
        public siteUrl = process.env.SITE_URL;
    // }
}


class DevelopmentConfig extends AppConfig{

    public isProduction = false;
    public host = 'localhost';
    public username = 'root';
    public password = '';
    public database = 'vacations';
    public port = 3001;
    public siteUrl = 'http://localhost:3000';
}

const appConfig = (process.env.NODE_ENV === 'production') ? new ProductionConfig() : new DevelopmentConfig();
export default appConfig; 


