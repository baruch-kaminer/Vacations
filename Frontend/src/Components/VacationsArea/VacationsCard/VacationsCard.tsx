import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import AuthContext from "../../../Context/AuthContext";
import FollowModel from "../../../Models/Follow-model";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/vacation-model";
import appConfig from "../../../Utils/config";
import VacationsFollow from "../VacationsFollow/VacationsFollow";
import "./VacationsCard.css";
import { Edit } from "@mui/icons-material";


interface VacationsCardProps{
    vacations: VacationModel
    deleteVacation: any
}


function VacationsCard(props:VacationsCardProps):JSX.Element{
    
    const [srcImage, setSrcImage] = useState<any>(null)

    const { auth } = useContext(AuthContext);
    const user: UserModel = auth.user;
    
    const followModel = new FollowModel();

    let startDate = new Date(props.vacations.startDate) ;

    const day = startDate.getDate();
 
    const month = startDate.toLocaleString('en-us', { month: 'short' });
    

    if(user){        
        followModel.userId = user.userId;
        followModel.vacationId = props.vacations.vacationId;
    }

useEffect(() => {
    if(props.vacations.imageName){   
        fetch(appConfig.vacationsUrl + 'images/' + props.vacations.imageName)
        .then(response => response.blob())
        .then(blob => {
            const objectURL = URL.createObjectURL(blob);
            setSrcImage(objectURL);
        })
        .catch(err => console.log(err))
    } 
}, []);



const delVacation = async(id:number) => {
    if (window.confirm("Do you really want to delete?")){
        props.deleteVacation(id)
      } 
}


    return(
        <div className="CardVacations">
           <article className="card">
                <header className="card__thumb">
                    <img src={srcImage}/>
                </header>
                <div className="card__date">
                    <span className="card__date__day">{day && day}</span>
                    <br/>
                    <span className="card__date__month">{month}</span>
                </div>
                <div className="card__body">
                    <div className="card__category">{ user?.role === 'User' && <VacationsFollow follow={followModel}/>}</div>
                    <h2 className="card__title">{props.vacations.destination}</h2>
                    <div className="card__subtitle">{props.vacations.description}</div>
                    <p className="card__description">The vacation will be on dates:<br/>
                    {new Date(props.vacations.startDate).toLocaleDateString().replace('2023', '2024')} - 
                    {new Date(props.vacations.endDate).toLocaleDateString().replace('2023', '2024')}<br/>
                    The price of the vacation: {props.vacations.price}&#36;
                    </p>
                </div>
                { user?.role === 'Admin' && <footer className="card__footer">
                <span className="icon ion-clock"></span> <span className="btnDelete" onClick={() => delVacation(props.vacations.vacationId)}>{<DeleteForeverTwoToneIcon/>}</span> <span className="borderLef"></span>                    
                <span className="icon ion-chatbox"></span><NavLink to={'/edit/' + props.vacations.vacationId}> <span className="btnEdit">{<Edit/>}</span></NavLink>                   
                </footer>}
            </article>
        </div>
    )
}

export default VacationsCard;
