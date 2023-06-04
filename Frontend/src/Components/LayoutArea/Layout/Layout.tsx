import Header from "../Header/Header";
import Main from "../Main/Main";
import "./Layout.css";
import { useReducer } from "react"
import { authReducer, AuthState } from "../../../Context/AuthReducer";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";


function Layout(): JSX.Element {

    const [auth, setAuth] = useReducer(authReducer, new AuthState());

    axios.interceptors.request.use((request:any) => {
        if (auth.token) request.headers = { authorization: "Bearer " + auth.token }
        return request;
    });


    return (
        <div className="Layout">
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Header/>
                <Main/>
            </AuthContext.Provider>           
        </div>
    );
}

export default Layout;
