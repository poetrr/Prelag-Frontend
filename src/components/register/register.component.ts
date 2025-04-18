import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OtpComponent } from '../otp/otp.component';


@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
     
    @ViewChild('registrationForm') registerForm :NgForm;

    
     registerData={
      email:'',
      password:'',
      username:'',
      otp:0
     }

     registrationError:boolean=false;
    constructor(private userService:UserService,
                private router:Router
    ){}
 
    sendOtpFunction() {
      console.log("button clicked");
      this.userService.sendOtp(this.registerData).subscribe({
        next: (message) => {
          console.log(message);
          this.userService.setRegisterData(this.registerData); // ✅ store it
          this.router.navigate(['/otp']);                      // then navigate
        },
        error: (error) => {
          console.log("couldn't send the OTP, some error occurred");
          this.registrationError = true;
        }
      });
    }

   


}
