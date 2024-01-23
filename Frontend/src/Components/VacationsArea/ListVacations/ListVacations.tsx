import "./ListVacations.css";
import { useContext, useState, useEffect } from "react";
import vacationsServices from "../../../Services/vacationsServices";
import notifyService from "../../../Services/NotifyService";
import VacationsCard from "../VacationsCard/VacationsCard";
import AuthContext from "../../../Context/AuthContext";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/vacation-model";
import useAuth from "../../../Services/useAuth";

function ListVacations():JSX.Element{

    const { isLoggedIn } = useAuth();
    const { auth } = useContext(AuthContext);
    const user: UserModel = auth.user;

    const [num, setNum] = useState(9);
    const [loader, setLoader] = useState<string>('')
    
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        setLoader('loader')
        vacationsServices.getTenVacations(num)
        .then(async vacations => {            
            await new Promise(() => {
                setTimeout(() => {
                    setLoader('v')
                    setVacations(vacations) 
                }, 1000);
            })            
        })
        .catch(err => notifyService.error(err))
    }, [num])
    
    const getVacationsByUserId = async() => {
        await vacationsServices.getVacationsByUserId(user.userId)
        try {
           const vacationsByUserId = await vacationsServices.getVacationsByUserId(user.userId);
           setVacations(vacationsByUserId);
        } catch (error) {
            notifyService.error(error);
        }
    }

     const deleteVacation = async(id:number) => {
        try {
            await vacationsServices.deleteVacation(id);
            notifyService.success('Deleted!');
            const newVacations = vacations.filter(v => v.vacationId!== id);
            setVacations(newVacations);        
        } catch (error:any) {
            notifyService.error(error.message);
        }     
    }         
  
    return(
        <div className="ListVacations">
            <span className={loader}></span>
            { isLoggedIn() && user.role === "User"  && <div className="divBtnNav"><button className="btnNav" onClick={getVacationsByUserId}>MY VACATIONS</button></div> }
           
            
            <div className="listCard">
                {
                vacations && vacations.map(v => <VacationsCard key={v.vacationId} vacations={v} deleteVacation={deleteVacation}/>)
                }
            </div>  
        {
            vacations.length > 0 &&
            <div className="btnShowMore">
                <button className="learn-more btnShowMore" onClick={() => setNum(num + 9)} >
                    <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Show More</span>
                </button> 
            </div>
        }
        </div>    
    )
}

export default ListVacations;
