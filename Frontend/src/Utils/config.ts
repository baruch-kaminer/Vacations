class AppConfig{

    // public serverUrl = "http://localhost:3001/api/";
    public serverUrl = `${process.env.SITE_URL}}/api/`;
    public registerUrl = this.serverUrl + 'auth/register/';
    public loginUrl = this.serverUrl + 'auth/login/';
    public usersUrl = this.serverUrl + 'auth/users/';
    public vacationsUrl = this.serverUrl + 'vacations/';
    public followUrl = this.serverUrl + 'follow/';
    
}
const appConfig = new AppConfig();
export default appConfig;