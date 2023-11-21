import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacations from "../../VacationsArea/EditVacations/EditVacations";
import VacationsChart from "../../VacationsArea/VacationsChart/VacationsChart";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";
import About from "../../HomeArea/About/About";

function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="chart" element={<VacationsChart />} />
                <Route path="/about" element={<About />} />
                <Route path="/insert" element={<AddVacation/>} />
                <Route path="/edit/:id" element={<EditVacations/>} />
                <Route path="/connection" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Navigate to='/'/>} />
                <Route path="*" element={<PageNotFound /> } /> 
            </Routes>
			
        </div>
    );
}

export default Routing;
