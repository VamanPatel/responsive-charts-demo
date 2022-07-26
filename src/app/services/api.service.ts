import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

interface barChart {
  id: number;
  month: string;
  value: number;
}
interface lineChart {
  id: number;
  month: string;
  value: number;
}
interface pieChart {
  id: number;
  color: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  showHideSpinner: boolean = false;
  constructor(private http: HttpClient) {}

  getBarData() {
    return this.http.get<barChart[]>('/assets/data/barChartData.json');
  }
  getPieData() {
    return this.http.get<pieChart[]>('/assets/data/pieChartData.json');
  }
  getLineData() {
    return this.http.get<lineChart[]>('/assets/data/lineChartData.json');
  }

  public exportExcelData(json: any[], excelFileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public saveAsExcelFile(buffer: any, filename: string) {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      filename + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
