import { Component, OnInit } from '@angular/core';
import { SemesterService } from '../../services/semester/semester.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubjectsComponent } from '../subjects/subjects.component';



@Component({
  selector: 'app-semesterpage',
  imports: [CommonModule,FormsModule],
  templateUrl: './semesterpage.component.html',
  styleUrl: './semesterpage.component.css'
})
export class SemesterpageComponent implements OnInit{
   
  semesterData:any[]=[];
  isCreatingSemester = false;
  newSemester = { semesterName: '' };

  editingSemesterId: number | null = null;
  editSemesterName: string = '';
  constructor(private semesterService:SemesterService,
    private router:Router
){}
  toggleCreateSemester() {
    this.isCreatingSemester = !this.isCreatingSemester;
    this.newSemester.semesterName = '';
  } 
  createSemester() {
    if (!this.newSemester.semesterName.trim()) return;
  
    this.semesterService.createSemester(this.newSemester.semesterName).subscribe({
      next: () => {
        this.loadSemesters();
        this.toggleCreateSemester();
      },
      error: err => console.error('Error creating semester:', err)
    });
  }
  startEditSemester(semester: any) {
    this.editingSemesterId = semester.semesterId;
    this.editSemesterName = semester.semesterName;
  }
  
  cancelEdit() {
    this.editingSemesterId = null;
    this.editSemesterName = '';
  }
  
  saveEditSemester(id: number) {
    if (!this.editSemesterName.trim()) return;
  
    this.semesterService.editSemester(id, this.editSemesterName).subscribe({
      next: () => {
        this.loadSemesters();
        this.cancelEdit();
      },
      error: err => console.error('Error updating semester:', err)
    });
  }
  
  deleteSemester(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this semester?');
    if (!confirmed) return;
  
    this.semesterService.deleteSemester(id).subscribe({
      next: () => this.loadSemesters(),
      error: err => console.error('Error deleting semester:', err)
    });
  }
  
  
  ngOnInit(): void {
      this.loadSemesters();
  }
 
  viewSubjects(semesterId: number) {
    this.semesterService.setSemesterId(semesterId);
    this.router.navigate(['/subjects']);
  }
  loadSemesters(){
    this.semesterService.getSemesters().subscribe({
      
      next:(semesters)=>{
        console.log(semesters);
        this.semesterData=semesters;  
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        
        console.log('Completed')
      }
    });
  }
}
