import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({ 
  declarations: [
    UsersComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
