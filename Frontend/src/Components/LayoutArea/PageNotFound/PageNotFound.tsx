import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<h1>Page Not Found!</h1>
            <span><NavLink to='/'>Home</NavLink></span>
        </div>
    );
}

export default PageNotFound;
