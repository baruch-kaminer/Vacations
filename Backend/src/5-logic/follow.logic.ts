import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";
import FollowModel from "../4-models/Follow-model";


async function followUp(follow: FollowModel): Promise<FollowModel> {
    const sql_amountFollowers = 'UPDATE  vacation SET amountFollowers = amountFollowers + 1 WHERE vacationId = ?;'
    await dal.execute( sql_amountFollowers, [follow.vacationId] );
    const sql = `INSERT INTO followvacation VALUES( DEFAULT, ?, ? ) `;
    const info:OkPacket = await dal.execute( sql, [follow.userId, follow.vacationId, follow.vacationId] );
    follow.followId = info.insertId;
    return follow;
};

async function followDown(id:number): Promise<void> {
    const sql_vacationId = 'SELECT vacationId FROM followvacation WHERE followId = ?'
    let vacationId = await dal.execute( sql_vacationId, [id] );
    for (const key in vacationId[0]) {
        vacationId = (vacationId[0][key]);
    }
    const sql_amountFollowers = 'UPDATE  vacation SET amountFollowers = amountFollowers - 1 WHERE vacationId = ?';
    await dal.execute( sql_amountFollowers, [vacationId] );
    const sql = `DELETE FROM followvacation WHERE followId = ?`;
    const info:OkPacket = await dal.execute( sql, [id] );
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id);
};

async function getAllFollows(): Promise<FollowModel[]> {
    const sql = 'SELECT * FROM followvacation';
    const FollowsList = await dal.execute( sql, [] );
    return FollowsList;
};

async function getFollowsByIDAndByVacation(userId:number, vacationId:number): Promise<FollowModel[]> {
    const sql = 'SELECT * FROM followvacation WHERE userId = ? AND vacationId = ?';
    const FollowsList = await dal.execute( sql, [userId, vacationId] );
    return FollowsList;
};

export default {
    followUp,
    followDown,
    getAllFollows,
    getFollowsByIDAndByVacation
}