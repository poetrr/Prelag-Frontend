import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Semester{
  semesterId?:number;
  semesterName:string;
  
}
@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  private apiUrl='http://localhost:8080/classroom';
  constructor(private http:HttpClient) { }

  getSemesters():Observable<Semester[]>{

    const token=localStorage.getItem('token');

    const url=`${this.apiUrl}/getSemester`;

    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json');

    return this.http.get<Semester[]>(url,{headers});
  }
}
