import fs from "fs";



export class JsonHelper {
    static readJson(filePath: string){

        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
}

