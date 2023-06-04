import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import fileHandler from "../2-utils/fileHandler";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";


async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacation`;
    const vacations = await dal.execute( sql, [] );
    return vacations;
}

async function getTenVacations(limit: number): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacation ORDER BY startDate LIMIT ? `;
    const vacations = await dal.execute( sql, [limit] );
    return vacations;
}

async function getOneVacations(id:number): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacation WHERE vacationId  = ?`;
    const vacation = await dal.execute( sql, [id] );
    return vacation;
}


async function getVacationsByUserId(useId:number): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacation LEFT JOIN followvacation
        ON vacation.vacationId = followvacation.vacationId  
        WHERE followvacation.userId = ?
    `;
    const vacation = await dal.execute( sql, [useId] )
    return vacation;
}

async function addVacation(vacation:VacationModel): Promise<VacationModel> {
    if(vacation.image){
        vacation.imageName = await fileHandler.saveFile(vacation.image);
        delete vacation.image;
    }    
    const sql = `INSERT INTO vacation VALUES( DEFAULT, ?, ?, ?, ?, ?, ?, 0 ) `;
    const info:OkPacket = await dal.execute( sql, [
        vacation.description, vacation.destination, vacation.imageName,
        vacation.startDate, vacation.endDate, vacation.price
    ] );
    vacation.vacationId = info.insertId;
    return vacation;
}

async function updateVacation(vacation:VacationModel): Promise<VacationModel> {
        
    if (vacation.image) {
        vacation.imageName && await fileHandler.deleteFile(vacation.imageName);
        vacation.imageName = await fileHandler.saveFile(vacation.image)
        delete vacation.image;
    }
    const sql = `
    UPDATE vacation SET
    description = ?,
    destination = ?,
    imageName = ?,
    startDate  = ?,
    endDate = ?,
    price = ?  
    WHERE vacationId = ?
    `;
    const info:OkPacket = await dal.execute( sql, [
        vacation.description, vacation.destination, vacation.imageName,
        vacation.startDate, vacation.endDate, vacation.price, vacation.vacationId
    ] );
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId);
    return vacation;
}

async function deleteVacation(id:number): Promise<void> {
    const vacation = await getAllVacations();
    const index = vacation.findIndex(v => v.vacationId === id);
    if(index === -1) throw new ResourceNotFoundErrorModel(id);
    await fileHandler.deleteFile(vacation[index].imageName); 
    const sql = `DELETE FROM vacation WHERE vacationId = ?`;
    const info:OkPacket = await dal.execute( sql, [id] );
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id);
}



export default {
    getAllVacations,
    getTenVacations,
    getOneVacations,
    addVacation,
    updateVacation,
    deleteVacation,
    getVacationsByUserId
}

