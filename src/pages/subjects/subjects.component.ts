import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../services/subjects/subjects.service';
import { SemesterService } from '../../services/semester/semester.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Subject {
  subjectId?: number;
  subjectName: string;
  presentCount: number;
  absentCount: number;
}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];

  newSubject = {
    subjectName: '',
    presentCount: 0,
    absentCount: 0
  };
  constructor(
    private subjectsService: SubjectsService,
    private semesterService: SemesterService
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    const semesterId = this.semesterService.getSemesterId();
    this.subjectsService.getSubjects(semesterId).subscribe({
      next: (data) => {
        this.subjects = data.map(subject => ({
          ...subject,
          presentCount: +subject.presentCount,
          absentCount: +subject.absentCount
        }));
      },
      error: (error) => {
        console.error('Error loading subjects:', error);
      }
    });
  }

  getAttendancePercentage(present: number, absent: number): number {
    const total = present + absent;
    return total > 0 ? (present / total) * 100 : 0;
  }

  incrementPresent(subject: Subject) {
    subject.presentCount++;
    this.syncAttendance(subject);
  }

  incrementAbsent(subject: Subject) {
    subject.absentCount++;
    this.syncAttendance(subject);
  }
  syncAttendance(subject: Subject) {
    if (!subject.subjectId) return;

    const payload = {
      semesterId: this.semesterService.getSemesterId(),
      subjectId: subject.subjectId,
      presentCount: subject.presentCount,
      absentCount: subject.absentCount
    };

    this.subjectsService.alterAttendance(payload).subscribe({
      next: (result) => console.log(`Attendance updated for ${subject.subjectName}: ${result}`),
      error: (err) => console.error('Failed to sync attendance:', err)
    });
  }

  deleteSubject(subjectId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this subject?');
    if (!confirmed) return;
  
    this.subjectsService.deleteSubject(this.semesterService.getSemesterId(), subjectId).subscribe({
      next: (result) => {
        console.log('Delete result:', result);
        this.subjects = this.subjects.filter(subject => subject.subjectId !== subjectId);
      },
      error: (error) => {
        console.error('Error deleting subject:', error);
      }
    });
  }
  isCreatingSubject = false;

  

toggleCreateForm() {
  this.isCreatingSubject = !this.isCreatingSubject;

}
editSubjectId: number | null = null;
editSubjectName: string = '';

startEditing(subject) {
  if (subject.subjectId != null) {
    this.editModes.add(subject.subjectId);
    this.editSubjectNames[subject.subjectId] = subject.subjectName;
  }
}

cancelEditing(subject) {
  if (subject.subjectId != null) {
    this.editModes.delete(subject.subjectId);
    delete this.editSubjectNames[subject.subjectId];
  }
}
editModes: Set<number> = new Set(); // Keeps track of subjectIds in edit mode
editSubjectNames: { [key: number]: string } = {}; // Temp name storage for each subject

saveSubjectName(subject: Subject) {
  const subjectId = subject.subjectId;
  if (subjectId == null || !this.editSubjectNames[subjectId]?.trim()) return;

  const newName = this.editSubjectNames[subjectId];
  
  this.subjectsService.updateSubjectName(subjectId, newName, this.semesterService.getSemesterId())
    .subscribe({
      next: () => {
        subject.subjectName = newName;
        this.cancelEditing(subject);
      },
      error: (err) => {
        console.error('Failed to update subject name:', err);
      }
    });
}
createSubject() {
  if (!this.newSubject.subjectName.trim()) return;

  this.subjectsService.createSubject(
    this.semesterService.getSemesterId(),
    this.newSubject.subjectName,
    this.newSubject.presentCount,
    this.newSubject.absentCount
  ).subscribe({
    next: () => {
      this.loadSubjects(); // Refresh the subject list
      this.newSubject = { subjectName: '', presentCount: 0, absentCount: 0 };
      this.isCreatingSubject = false;
    },
    error: (err) => {
      console.error('Error creating subject:', err);
    }
  });
}
  
}
