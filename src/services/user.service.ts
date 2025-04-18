import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Login{
  email:string;
  password:string;
}

interface Register{
  email:string, 
  password:string,
  username:string,
  otp:number
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl='http://localhost:8080/classroom/login';

  private sendOtpUrl='http://localhost:8080/classroom/sendOtp';

  private validateOtpUrl='http://localhost:8080/classroom/validateOtp';

  

  constructor(private http:HttpClient) { }

  private registerPayload: Register | null = null;

setRegisterData(data: Register) {
  console.log('Register data stored in service:', data);
  this.registerPayload = data;
}

getRegisterData(): Register | null {
  console.log('Register data retrieved from service:', this.registerPayload);
  return this.registerPayload;
}


  loginfunction(loginData: Login): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl, loginData, {
      headers: headers,
      responseType: 'text'  // Specify response type as text
    });
  }

  sendOtp(register:Register):Observable<string>{
      return this.http.post(this.sendOtpUrl,register,{
        responseType:'text'
      });
  }

  validateOtp(register:Register):Observable<string>{
    return this.http.post(this.validateOtpUrl,register,{
        responseType:'text'
    })
  }
}
