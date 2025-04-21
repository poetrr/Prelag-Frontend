import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-bootstrap',
  standalone:true,
  imports: [FontAwesomeModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './bootstrap.component.html',
  styleUrl: './bootstrap.component.css'
})
export class BootstrapComponent implements AfterViewInit{
  @ViewChild('navmenu') navmenu!: ElementRef;
  faGraduationCap = faGraduationCap; 
  ngAfterViewInit(): void {
    new bootstrap.Collapse(this.navmenu.nativeElement, {
      toggle: false, // Prevent immediate toggle
    });
  }
  logout(){
    alert('Button clicked');
  }
  editSemesterName(){

  }
  deleteSemesterName(){

  }
  otpData={
    otp:''
  }
  loginData = {
    email: '',
    password: ''
  };
  registerData = {
    username:'',
    email:'',
    password:''
  };
  isSubmitDisabled: boolean = false;
  timeLeft: number = 60; 
  onOtpSubmit(form:NgForm){
    if (form.valid && !this.isSubmitDisabled && this.timeLeft > 0) {
      this.isSubmitDisabled = true;
      this.startTimer()  // Disable button after submission
      // Your OTP validation logic here
      console.log('OTP submitted:', this.otpData.otp);

  }}
  onSubmit(form: NgForm) {
    if (form.valid) {
      
      console.log('Form submitted', this.loginData);
      // Add your login logic here
    }
  }
  
  onRegisterSubmit(form:NgForm){
    if(form.valid){
      console.log("Form submitted");
    }
  }

  
  
  // 2 minutes in seconds
  private timerInterval: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
  
  startTimer() {
     // Reset timer to 2 minutes
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerInterval);
        this.isSubmitDisabled = false;
      }
    }, 1000);
  }

  resendOTP() {
    this.isSubmitDisabled = false; 
    this.startTimer(); // Restart the timer
    // Call your API to resend OTP
  }
}
