import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-otp',
  imports: [FormsModule,CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})

export class OtpComponent implements OnInit, OnDestroy {
  isSubmitDisabled: boolean = false; // Tracks if the submit button is disabled
  timeLeft: number = 30; // Timer duration in seconds
  private timerInterval: any;
  otpData={
    otp:''
  }
  ngOnInit() {
    this.startTimer();
  }

  onOtpSubmit(form: NgForm) {
    if (form.valid && !this.isSubmitDisabled && this.timeLeft > 0) {
      this.isSubmitDisabled = true; // Disable the button after submission
      console.log('OTP submitted:', this.otpData.otp);
      // Add your OTP validation logic here
    }
  }

  startTimer() {
    this.timeLeft = 30; // Reset the timer
    this.isSubmitDisabled = false; // Enable the submit button when the timer starts
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // Clear any existing timer
    }
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerInterval); // Stop the timer when it reaches 0
        this.isSubmitDisabled = false; // Enable the submit button when the timer ends
      }
    }, 1000);
  }

  resendOTP() {
    this.startTimer(); // Restart the timer
    this.isSubmitDisabled = false; 
    // Enable the submit button
    console.log('OTP resent');
    // Add your resend OTP logic here
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // Clear the timer when the component is destroyed
    }
  }
}