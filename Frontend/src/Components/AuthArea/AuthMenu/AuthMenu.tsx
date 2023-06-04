import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import UserModel from "../../../Models/UserModel";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const { auth } = useContext(AuthContext);
    const user: UserModel = auth.user;

    
    return (
        <div className="AuthMenu">
            {
                !user &&
                <>
                    <span>Hello Guest</span>
                    <span className="sp"> | </span>
                    <NavLink to="/connection"><span className="sp">Connection</span>{<span className="ps"><LoginTwoToneIcon/></span>} </NavLink>
                    
                </>
            }
            {
                user &&
                <>
                    <span className="name">{user.firstName + " " + user.lastName}</span>
                    <span className="sp"> | </span>
                    <NavLink to="/logout"><span className="sp">Logout</span>{<span className="ps"><LogoutIcon/></span>}</NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;
