import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { SemesterpageComponent } from '../pages/semesterpage/semesterpage.component';
import { SubjectsComponent } from '../pages/subjects/subjects.component';
import { BootstrapComponent } from '../components/bootstrap/bootstrap.component';
import { TemplateComponent } from '../components/template/template.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {path:'semester',component:SemesterpageComponent},
    {path:'subjects',component:SubjectsComponent},
    {path:'bootstrap',component:BootstrapComponent},
    {path:'template',component:TemplateComponent}
];
