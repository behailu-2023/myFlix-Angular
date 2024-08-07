import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

export const routes: Routes = [
  { path: 'register', component: UserRegistrationFormComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }