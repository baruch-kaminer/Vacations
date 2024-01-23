import axios from "axios";
import appConfig from "../Utils/config";

class VacationsServices{
    public getAllVacations = async() => {
        const response = await axios.get(appConfig.vacationsUrl);
        return response.data;
    }

    public getTenVacations = async(limit: number) => {
        const response = await axios.get(appConfig.vacationsUrl + 'limit/' + limit);        
        return response.data;
    }

    public getOneVacations = async(id:number) => {
        const response = await axios.get(appConfig.vacationsUrl + id);
        const vacations = response.data;
        return vacations[0];
    }

    public getVacationsByUserId = async(id:number) => {
        const response = await axios.get(appConfig.vacationsUrl + 'user/' + id);
        const vacations = response.data;
        return vacations;
    }
    
    
    public addVacation = async(vacation:any) => {
        
        const response = await axios.post(appConfig.vacationsUrl, vacation);
        return response.data;
    }
    
    public updateVacation =  async(vacation:any, id: number) => {
        
        await axios.patch(appConfig.vacationsUrl + id, vacation);
     }
     
     public deleteVacation = async(id:number) => {
        await axios.delete(appConfig.vacationsUrl + id); 
   }
}

const vacationsServices = new VacationsServices();
export default vacationsServices;