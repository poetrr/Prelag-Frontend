import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Subjects{
  subjectId?:number,
  subjectName:string,
  presentCount:string,
  absentCount:string

}
interface SubjectId{
  subjectId:number
}
@Injectable({
  providedIn: 'root'
})
export class SubjectsService{


  private apiUrl='http://localhost:8080/classroom'
  constructor(private http:HttpClient) { }

  getSubjects(subjectId:SubjectId):Observable<Subjects[]>{
    const token=localStorage.getItem('token');
    const url=`${this.apiUrl}/getSubjects`;
    const headers=new HttpHeaders()
        .set('Authorization',`Bearer ${token}`)
        .set('Content-Type','application/json');
      
    return this.http.get<Subjects[]>(url,{headers});
  }
  
}
