
import { NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-template',
  standalone:true,
  imports: [FormsModule,NgClass],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {


  /*Using ViewChild decorator we can access the dom element from the template */
  @ViewChild('registrationForm') form:NgForm;

  OnFormSubmitted(){
    console.log("form submitted");
    console.log(this.form); /*Prints the javascript object */
    /*prints the value */
    console.log(this.form.value.firstname);
    console.log(this.form.controls['firstname'].value);
   
  }

}
