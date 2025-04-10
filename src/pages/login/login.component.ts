import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(
      private userservice:UserService,
      private router:Router
  ){}
  loginData={
    email:'sidducit012@gmail.com',
    password:'siddu@cit012*'
  }

  ngOnInit():void{
    console.log('oninit')
    this.login();
  }

  login(){
    this.userservice.loginfunction(this.loginData).subscribe({
    
      next:(token)=>{
        
        console.log(token);
        
        localStorage.setItem('token',token.toString());
        this.router.navigate(['/semester']);
      },
      error:(error)=>{
          console.log(error);
      },
      complete:()=>{
        console.log("complete");
      }
    });
  }
}
