import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users/users.service';
import { LoginComponent } from './';
// login pipes

// login directives

// login services

// login providers
const LOGIN_PROVIDERS = [
  UsersService
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LOGIN_PROVIDERS
  ]
})
export class LoginModule {
  constructor() {}

}

