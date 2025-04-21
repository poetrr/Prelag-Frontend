import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
      private userservice:UserService,
      private router:Router
  ){}
  loginData={
    email:'',
    password:''
  }
  loginError:boolean=false;
  
  
  login(){
    this.userservice.loginfunction(this.loginData).subscribe({
    
      next:(token)=>{
        
        console.log(token);
        
        localStorage.setItem('token',token.toString());
        this.router.navigate(['/semester']);
      },
      error:(error)=>{
          console.log(error);
          this.loginError=true;
      },
      complete:()=>{
        console.log("complete");
      }
    });
  }
}
