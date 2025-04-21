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
  private selectedSemesterId: any;

  setSemesterId(id: number) {
    this.selectedSemesterId = id;
  }

  getSemesterId(): number {
    return this.selectedSemesterId;
  }
  constructor(private http:HttpClient) { }

  getSemesters():Observable<Semester[]>{

    const token=localStorage.getItem('token');

    const url=`${this.apiUrl}/getSemester`;

    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json');

    return this.http.get<Semester[]>(url,{headers});
  }
  createSemester(semesterName: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { semesterName };
    return this.http.post(`${this.apiUrl}/createSemester`, body, { headers });
  }
  
  editSemester(id: number, semesterName: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { semesterId: id, semesterName };
    return this.http.put(`${this.apiUrl}/alterSemester`, body, { headers });
  }
  
  deleteSemester(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { semesterId: id };
    return this.http.request('delete', `${this.apiUrl}/deleteSemester`, {
      headers,
      body
    });
  }
}
