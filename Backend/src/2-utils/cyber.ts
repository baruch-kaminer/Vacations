import { Request } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../4-models/user-model";
import crypto from "crypto"
import RoleModel from "../4-models/role-model";

const jwtSecretKey = "baruchKaminer";

function getNewToken(user: UserModel): string {
    delete user.password;
    const container = { user };
    const options = { expiresIn: "3h" };
    const token = jwt.sign(container, jwtSecretKey, options);
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jwt.verify(token, jwtSecretKey, err => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}


const salt = 'myStringForPasswords';

function hash( plainText: string): string{
    if(!plainText ) return null;
    const hashedText = crypto.createHmac('sha512', salt ).update(plainText).digest('hex');
    return hashedText;
}


async function verifyAdmin(request: Request): Promise<boolean> {

    const isLoggedIn = await verifyToken(request);
    if (!isLoggedIn) return false;
    const header = request.header('authorization');
    const token = header.substring(7);
    const container: any = jwt.decode(token);
    const user: UserModel = container.user;
    return user.role === RoleModel.Admin
}


export default {
    getNewToken,
    verifyToken,
    hash,
    verifyAdmin
};
