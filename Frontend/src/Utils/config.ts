class AppConfig{

    // public serverUrl = "http://localhost:3001/api/";
    public serverUrl = "http://localhost:13553/api/";
    // public serverUrl = `${process.env.PORT}/api/`;
    // public serverUrl = `https://my-vacations-2856224fbe83.herokuapp.com/api/`;
    public registerUrl = this.serverUrl + 'auth/register/';
    public loginUrl = this.serverUrl + 'auth/login/';
    public usersUrl = this.serverUrl + 'auth/users/';
    public vacationsUrl = this.serverUrl + 'vacations/';
    public followUrl = this.serverUrl + 'follow/';
    
}
const appConfig = new AppConfig();
export default appConfig;