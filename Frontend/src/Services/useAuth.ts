import axios from 'axios';
import UserModel from "../Models/UserModel";
import CredentialsModel from '../Models/CredentialsModel';
import { AuthActionType } from '../Context/AuthReducer';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import appConfig from '../Utils/config';

function useAuth() {

    const { auth, setAuth } = useContext(AuthContext);

    async function registerUser(user: UserModel): Promise<void> {
        console.log(user);
        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token = response.data;
        setAuth({ type: AuthActionType.Register, payload: token });
    }

    async function login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token = response.data;
        setAuth({ type: AuthActionType.Login, payload: token });
    }

    function logout(): void {
        setAuth({ type: AuthActionType.Logout });
    }

    function isLoggedIn(): boolean {
        return auth.token !== null;
    }

    async function getOneUser(id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(appConfig.usersUrl + id);
        const user = response.data;
        return user;
    }

    async function updateUser(user: UserModel): Promise<void> {
        const response = await axios.patch<UserModel>(appConfig.usersUrl + user.userId, user);
        const updatedUser = response.data;
        setAuth({ type: AuthActionType.Update, payload: updatedUser });
    }


    return {
        registerUser,
        login,
        logout,
        isLoggedIn,
        getOneUser,
        updateUser,
    }

}

export default useAuth;