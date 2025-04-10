
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {


  /*Using ViewChild decorator we can access the dom element from the template */
  @ViewChild('registrationForm') form:NgForm;

  OnFormSubmitted(){
    console.log("form submitted");
    console.log(this.form);
  }

}
