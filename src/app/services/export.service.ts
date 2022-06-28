import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Export} from "../models/export.model";

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3000/exports";
  }

  getExports(): Observable<Array<Export>> {
    return this.http.get<Array<Export>>(this.baseUrl);
  }

  getExportsSortedByDate(): Observable<Array<Export>> {
    return this.getExports().pipe(map(value => {
      return value.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      })
    }));
  }

  addExport(newExport: Export): Observable<any> {
    return this.http.post(this.baseUrl, newExport);
  }
}
