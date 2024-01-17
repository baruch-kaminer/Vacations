import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

async function saveFile(file: UploadedFile): Promise<string> {

    const ext = path.extname(file.name);
    const fileName = uuidv4() + ext;
    await file.mv("./src/1-assets/images/" + fileName);
    return fileName;
}

function deleteFile(fileName: string): void {
    if (fileExists(fileName)) {
        fs.unlinkSync("./src/1-assets/images/" + fileName)
    }
}


function fileExists(fileName: string): boolean {
    if (fs.existsSync("./Backend/src/1-assets/images/" + fileName)) {
        return true;
    }
    return false;
}


export default {
    saveFile,
    deleteFile,
    fileExists
}