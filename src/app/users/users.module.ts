import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { UsersComponent, UserFormComponent, UsersListComponent, UserEditComponent } from './';
// users pipes

// users directives

// users services

// users providers
const USER_PROVIDERS = [
  UsersService
];

@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    UsersListComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    USER_PROVIDERS
  ]
})
export class UsersModule {
  constructor() {}

}

