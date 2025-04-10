import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { BootstrapComponent } from "../components/bootstrap/bootstrap.component";
import { OtpComponent } from "../components/otp/otp.component";
import { ApiconnectingComponent } from "../components/apiconnecting/apiconnecting.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
