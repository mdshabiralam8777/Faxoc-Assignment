import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

newInput! : string;
inputItem! : string;
private apiUrl = 'https://jsonblob.com/api/jsonBlob/1114440732240003072';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  addNewCompany(newCompany : any):  Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((data: any) => {
        const existingCompanies = data.companies || [];
        return { companies: [...existingCompanies, newCompany] };
      }),
      switchMap((updatedData: any) => this.http.put(this.apiUrl, updatedData))
    );
  }
}
