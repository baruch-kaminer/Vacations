import { UploadedFile } from "express-fileupload";

class VacationModel{

    public vacationId: number;
    public description: string;
    public destination: string;
    public image: UploadedFile;
    public imageName: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public amountFollowers: number;
    
    public constructor(vacation: VacationModel){
        this.vacationId =  vacation.vacationId;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.amountFollowers = vacation.amountFollowers;
    }
}

export default VacationModel;