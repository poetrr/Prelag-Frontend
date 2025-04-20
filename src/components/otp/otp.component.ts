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
    
    this.startTimer();
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
      next: (response: any) => {
        console.log('Raw Server Response:', response);
        if (typeof response === 'string') {
          try {
            response = JSON.parse(response);
          } catch (e) {
            console.error('Failed to parse response:', e);
            this.serverError = true;
            return;
          }
        }
        debugger;
        if (response.message === 'Invalid Otp') {
          this.otpError = true;
        } else if (response.message === 'OTP validated successfully') {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/semester']);
        }
      },
      error: (error) => {
        console.error('Unexpected Server Error:', error);
        this.serverError = true;
      }
    });
  } 

  isTimerRunning = false;
  canResend = false;
  resendClicked = false;
  intervalRef: any;
  registrationError:any;
  timer: number = 60;
  resendEnabled:boolean=false;

  startTimer() {
    this.timer = 60;
    this.isTimerRunning = true;
    this.canResend = false;

    this.intervalRef = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(this.intervalRef);
        this.isTimerRunning = false;
        this.canResend = true;
        this.resendClicked = false;
        this.resendEnabled=true;
      }
    }, 1000);
  }

  resendOtpFunction(){
    
    console.log("button clicked");
    this.startTimer();
    this.resendEnabled=false;
      this.userService.sendOtp(this.registerData).subscribe({
        next: (message) => {
          console.log(message);
          this.userService.setRegisterData(this.registerData); 
                            
        },
        error: (error) => {
          console.log("couldn't send the OTP, some error occurred");
          this.registrationError = true;
        }
      });
  } 
  
}
