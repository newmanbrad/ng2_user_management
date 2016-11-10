import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user.model';
import { UsersService } from "./users.service";

@Component({
  moduleId: module.id,
  selector: 'user-form',
  templateUrl: 'user-form.template.html'
})
export class UserFormComponent implements OnInit {
  @Input() userId;

  model = new User();
  errorMessage = '';
  submitted: boolean = false;
  userType$: string[] = [];

  private user: any[] = [];

  // form vars
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(private _usersService: UsersService,
              private _router: Router
              ){}

  ngOnInit(): void {
    this.getUserTypes();
    this.getUserData();
  }

  private getUserTypes (): void {
    this._usersService.getUserTypes()
      .subscribe(
        (userTypes) => this.userType$ = userTypes,
        error =>  this.errorMessage = <any>error);
  }

  private getUserData (): void {
    this._usersService.getUserById(this.userId)
      .subscribe(
        (data) => this.setUserModel(data),
        error =>  this.errorMessage = <any>error);
  }

  setUserModel(user): void {
    let { _id, username, password, email, firstName, lastName } = user[0];
    this.model = new User(_id, username, password, email, firstName, lastName);
  }

  addUser (form: NgForm) {
    this._usersService.updateUser(form.value).subscribe(data => console.log(data));
    this.submitted = true;
  }

  backToUsersList(): void {
    this._router.navigate(['/users']);
  }

}
