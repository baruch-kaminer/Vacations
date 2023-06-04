import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import UserModel from "../../../Models/UserModel";
import useAuth from "../../../Services/useAuth";
import ListVacations from "../../VacationsArea/ListVacations/ListVacations";
import { NavLink } from "react-router-dom";
import PopupState from "material-ui-popup-state";
import { Button, Menu, MenuItem } from "@mui/material";
import { bindMenu, bindTrigger } from "material-ui-popup-state/hooks";
import * as React from 'react';
import "./Home.css";



function Home(): JSX.Element {


    const { isLoggedIn } = useAuth();
    const { auth } = useContext(AuthContext);
    const user: UserModel = auth.user;

    return (
        <div className="Home">
            {
             isLoggedIn() && user.role === "Admin"  && 
             <div className="divBtnNav btnAdmin">
                <PopupState variant="popover"  popupId="demo-popup-menu">
                    {(popupState:any) => (
                        <React.Fragment >
                            <Button variant="contained" className="btnNav " {...bindTrigger(popupState)}>
                                Dashboard
                            </Button>
                            <Menu {...bindMenu(popupState)} className="menuNav">
                                <NavLink to='/Insert'><MenuItem onClick={popupState.close}>Add Vacation</MenuItem></NavLink>
                                <NavLink to='/Chart'><MenuItem onClick={popupState.close}>Chart</MenuItem></NavLink>
                                <NavLink to='/logout'><MenuItem onClick={popupState.close}>Logout</MenuItem></NavLink>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </div>
           }
			<ListVacations/>
        </div>
    );
}

export default Home;
