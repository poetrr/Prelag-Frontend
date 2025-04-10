import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [FormsModule,CommonModule,FontAwesomeModule,NgbModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    isLoggedIn:boolean=true;
    faGraduationCap = faGraduationCap; 
}
