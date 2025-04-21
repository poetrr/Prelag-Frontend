import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registrationForm') registerForm: NgForm;

  registerData = {
    email: '',
    password: '',
    username: '',
    otp: 0
  };

  registrationError: boolean = false;
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  sendOtpFunction() {
    this.registrationError = false;
    this.isLoading = true;
    this.userService.sendOtp(this.registerData).subscribe({
      next: (message) => {
        console.log(message)
        this.userService.setRegisterData(this.registerData);
        this.router.navigate(['/otp']).then(() => {
          this.isLoading = false;
        });
      },
      error: (error) => {
        console.log("couldn't send the OTP, some error occurred");
        this.registrationError = true;
        this.isLoading = false;
      }
    });
  }
}
