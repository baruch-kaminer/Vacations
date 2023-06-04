import axios from "axios";
import FollowModel from "../Models/Follow-model";
import appConfig from "../Utils/config";

class FollowServices{

    public followUp = async(follow:FollowModel) =>{
        const response = await axios.post(appConfig.followUrl, follow);
        return response.data;
    }
    
     public followDown = async(id:number) =>{
        await axios.delete(appConfig.followUrl + id); 
   }

   public getAllFollows = async() =>{
    const response = await axios.get(appConfig.followUrl);
    return response.data;
   }

   public getFollowsByIdAndByVacation = async(userId:number, vacationId:number) =>{
    const response = await axios.get(appConfig.followUrl + userId + '/' + vacationId);
    return response.data[0];
   }

}

const followServices = new FollowServices();
export default followServices;