import { NavLink } from "react-router-dom";
import "./Menu.css";


function Menu(): JSX.Element {

    return (
        <div className="Menu">
            <div className="logo">
                {/* <h1>Blissful</h1> */}
                <a href="/" ><h1>My Vacations</h1></a> 
                <NavLink to='about'><h2>About</h2></NavLink>
            </div>
                
        </div>
    );
}

export default Menu;
