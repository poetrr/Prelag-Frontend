import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-apiconnecting',
  standalone:true,
  imports: [],
  templateUrl: './apiconnecting.component.html',
  styleUrl: './apiconnecting.component.css'
})
export class ApiconnectingComponent implements OnInit {

  myObservable=new Observable((observer)=>{
    setTimeout(()=>{observer.next("1")},1000);
    setTimeout(()=>{observer.next("2")},2000);
    setTimeout(()=>{observer.next("3")},3000);
    setTimeout(()=>{observer.complete()},4000);
    
  })
  ngOnInit(): void {
      this.myObservable.subscribe({
        next(val:any){
          console.log(val)
        },
        error(err){

        },
        complete(){
          alert("complete")
        }
      });
  }

}
