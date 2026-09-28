
import XLSX from 'xlsx';

export class ExcelHelper {
    static readExcel(filePath: string, sheetName: string): Record<string, string>[] {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) {
            throw new Error(`Sheet ${sheetName} not found in ${filePath}`);
        }
        return XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
    }
}
