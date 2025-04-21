import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Subjects{
  subjectId?:number,
  subjectName:string,
  presentCount:string,
  absentCount:string

}

interface AlterSubjectsRequest {
  semesterId: number;
  subjectId: number;
  presentCount: number;
  absentCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectsService{


  private apiUrl='http://localhost:8080/classroom'
  constructor(private http:HttpClient) { }

  getSubjects(semesterId: number): Observable<Subjects[]> {
    const token = localStorage.getItem('token');
    const url = `${this.apiUrl}/getSubjects`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    const body = { semesterId: semesterId };

    return this.http.post<Subjects[]>(url, body, { headers });
  }
  alterAttendance(request: AlterSubjectsRequest): Observable<number> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  
    return this.http.put<number>(`${this.apiUrl}/alterAttendance`, request, { headers });
  }
  deleteSubject(semesterId: number, subjectId: number): Observable<number> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  
    const body = { semesterId, subjectId };
  
    return this.http.request<number>('delete', `${this.apiUrl}/deleteSubject`, {
      body,
      headers
    });
  }
  createSubject(semesterId: number, subjectName: string, presentCount: number, absentCount: number): Observable<number> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  
    const body = {
      semesterId,
      subjectName,
      presentCount,
      absentCount
    };
  
    return this.http.post<number>(`${this.apiUrl}/createSubjects`, body, { headers });
  }
  updateSubjectName(subjectId: number, subjectName: string, semesterId: number): Observable<number> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  
    const body = {
      subjectId,
      subjectName,
      semesterId
    };
  
    return this.http.put<number>(`${this.apiUrl}/updateSubjectName`, body, { headers });
  }
  
}
  

