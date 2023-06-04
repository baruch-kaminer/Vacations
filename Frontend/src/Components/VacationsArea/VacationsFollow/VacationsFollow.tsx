import { useState, useEffect } from "react";
import FollowModel from "../../../Models/Follow-model";
import followServices from "../../../Services/followServices";
import notifyService from "../../../Services/NotifyService";
import "./VacationsFollow.css";

interface VacationsFollowProps{
    follow:FollowModel
}

function VacationsFollow(props:VacationsFollowProps):JSX.Element{
    
    
    const [btnFollow, setBtnFollow] = useState(false);
    const [followers, setFollowers] = useState<number>(0);
    const [newFollowers, setNewFollowers] = useState<FollowModel>();
    const [textBtn, setTextBtn] = useState<string>( '+ Follow' );
    const [className, setClassName] = useState<string>('follow-button');


    useEffect(() => {
        followServices.getFollowsByIdAndByVacation(props.follow?.userId, props.follow?.vacationId)
        .then((followers) =>{
            setFollowers(followers?.followId);
            followers && setTextBtn('Following');
            followers && setClassName(className + ' click');
        })
        .catch(err => notifyService.error(err)) 
    },[]);
    
    
    const follow = async () => { 
        if(!btnFollow && !followers){
            setBtnFollow(true);
        try {
            const newFollowers = await followServices.followUp(props.follow);
            setNewFollowers(newFollowers);
            setClassName(className + ' click'); 
            setTextBtn('Following');                      
        } catch (error) {
            notifyService.error(error);
        } finally{
            return;
        }};

        setBtnFollow(false);
        
        try {
            await followServices.followDown(newFollowers?.followId || followers);
            setFollowers(0);
            setNewFollowers(null);
            setClassName('follow-button');
            setTextBtn('+ Follow');
        } catch (error) {
            notifyService.error(error);
        }
    };


    return(
        <div className="VacationsFollow">
           <button className={className} onClick={follow}>{textBtn}</button>
        </div>
    )
}


export default VacationsFollow;
