import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  imports:[CommonModule,FormsModule],
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit {
  @ViewChild('otpForm') otpForm!: NgForm;

  registerData = {
    email: '',
    password: '',
    username: '',
    otp: 0
  };

  otpError = false;
  serverError = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const data = this.userService.getRegisterData();
    console.log("data to be printer",data);
    if (data) {
      this.registerData.email = data.email;
      this.registerData.password = data.password;
      this.registerData.username = data.username;
    } else {
      this.router.navigate(['/register']); // fallback if data not found
    }
  }

  validateOtpFunction() {
    this.otpError = false;
    this.serverError = false;
  
    this.userService.validateOtp(this.registerData).subscribe({
      next: (message: string) => {
        console.log('Server Response:', message);
  
        if (message === 'OTP validated successfully') {
          this.router.navigate(['/success']); // navigate or show success
        } else if (message === 'Invalid OTP.' || message === 'OTP expired.' || message === 'No OTP found for this email.') {
          this.otpError = true;
        } else {
          this.serverError = true;
        }
      },
      error: (error) => {
        console.error('Unexpected Server Error:', error);
        this.serverError = true;
      }
    });
  }
  
}
