import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Login{
  email:string;
  password:string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl='http://localhost:8080/classroom/login';

  constructor(private http:HttpClient) { }

  loginfunction(loginData: Login): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl, loginData, {
      headers: headers,
      responseType: 'text'  // Specify response type as text
    });
  }

}
