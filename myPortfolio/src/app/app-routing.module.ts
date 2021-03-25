import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './authGuard';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"\login", component:LoginComponent},
  {path:"\signup", component:SignupComponent},
  {path:"\portfolio", component:PortfolioComponent,  canActivate:[authGuard]},

  {path:"",redirectTo:"\login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
