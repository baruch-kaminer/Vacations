import mysql from "mysql";
import appConfig from "./AppConfig";


// const mysql = require('mysql');
const connection = mysql.createConnection(process.env.JAWSDB_URL || 'mysql://tntw6yz08df6vkok:ems7fdbtkang8ror@lmc8ixkebgaq22lo.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/ndi3t2ozk5n1pkel' );

// const connection = mysql.createPool({
//     host: appConfig.host,
//     user: appConfig.username,
//     password : appConfig.password,
//     database : appConfig.database,
// });

function execute(sql: string, values?: any[] ): Promise<any>{
    return new Promise(( resolve, reject ) => {
        connection.query(sql, values, ( err, result ) => {
            if( err ){
                reject(err);
                return;
            }
            resolve(result);
        })
    });
}

export default {
    execute
}
