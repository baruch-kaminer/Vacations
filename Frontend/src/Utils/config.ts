class AppConfig{
    public serverUrl = process.env.NODE_ENV === 'production' ? `https://my-vacations-2856224fbe83.herokuapp.com/api/` : "http://localhost:3001/api/";
    public registerUrl = this.serverUrl + 'auth/register/';
    public loginUrl = this.serverUrl + 'auth/login/';
    public usersUrl = this.serverUrl + 'auth/users/';
    public vacationsUrl = this.serverUrl + 'vacations/';
    public followUrl = this.serverUrl + 'follow/';
    
}
const appConfig = new AppConfig();
export default appConfig;