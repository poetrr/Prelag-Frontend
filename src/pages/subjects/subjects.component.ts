import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SubjectsService } from '../../services/subjects/subjects.service';

@Component({
  selector: 'app-subjects',
  imports: [],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent implements  OnChanges{
  @Input() semesters: any[]=[];

  

  constructor(private subjectsService:SubjectsService){}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['semesters'] && this.semesters && this.semesters.length > 0) {
      this.loadSubjects();
    }
  }
  loadSubjects() {
    this.subjectsService.getSubjects( this.semesters[0].semesterId )
      .subscribe({
        next: (subjects) => {
          console.log('Subjects loaded:', subjects);
        },
        error: (error) => {
          console.error('Error loading subjects:', error);
        }
      });
  }
  

}
