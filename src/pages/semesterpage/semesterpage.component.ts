import { Component, OnInit } from '@angular/core';
import { SemesterService } from '../../services/semester/semester.service';
import { Router } from '@angular/router';
import { SubjectsComponent } from "../subjects/subjects.component";


@Component({
  selector: 'app-semesterpage',
  imports: [SubjectsComponent],
  templateUrl: './semesterpage.component.html',
  styleUrl: './semesterpage.component.css'
})
export class SemesterpageComponent implements OnInit{
   
  semesterData:any[]=[];

  constructor(private semesterService:SemesterService,
              private router:Router
  ){}
  
  ngOnInit(): void {
      this.loadSemesters();
  }
  loadSemesters(){
    this.semesterService.getSemesters().subscribe({
      
      next:(semesters)=>{
        console.log(semesters);
        this.semesterData=semesters;
        this.router.navigate(['/subjects']);
        
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        debugger;
        console.log('Completed')
      }
    });
  }
}
