import { NavLink } from "react-router-dom";
import "./Menu.css";


function Menu(): JSX.Element {

    return (
        <div className="Menu">
            <NavLink to='/'>
                <div className="logo">
                    <h1>Blissful</h1>
                    <h2>Vacations</h2>
                </div>    
            </NavLink> 
        </div>
    );
}

export default Menu;
