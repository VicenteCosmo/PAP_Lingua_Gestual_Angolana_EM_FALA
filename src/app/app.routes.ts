import { Routes } from '@angular/router';
import { SignupComponent } from '../_components/signup/signup.component';
import { AppComponent } from './app.component';
import { HomeComponent } from '../_components/home/home.component';
import { IndividualComponent } from '../_components/individual/individual.component';
import { UpdateComponent } from '../_components/update/update.component';
import { LoginComponent } from '../_components/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: 'list/:id', component: IndividualComponent },
    { path: 'list/update/:id', component: UpdateComponent },
    { path: 'login', component: LoginComponent },
];
