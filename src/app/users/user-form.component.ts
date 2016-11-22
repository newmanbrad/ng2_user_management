import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from './user.model';
import { UsersService } from "./users.service";

@Component({
  moduleId: module.id,
  selector: 'user-form',
  templateUrl: 'user-form.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit, OnDestroy {
  userId:string = null;
  private subscription: Subscription;


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
              private _router: Router,
              private _activatedRoute: ActivatedRoute
              ){}

  ngOnInit(): void {
    this.getUserTypes();

    this.subscription = this._activatedRoute.params.subscribe(
      (param: any) => {
        let currentId = param['id'];
        if(currentId){
          this.userId = currentId;
          this.getUserData();
        }
      });

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

    console.log(user);
    let { username, password, email, firstName, lastName } = user;
    this.model = new User(this.userId, username, password, email, firstName, lastName);
  }

  addEditUser (form: NgForm) {

    if(this.userId){
      // edit
      this._usersService.updateUser(form.value).subscribe(data => console.log(data));
    } else {
      // add
      this._usersService.addUser(form.value).subscribe(data => console.log(data));
    }
    this.submitted = true;
  }

  backToUsersList(): void {
    this._router.navigate(['/users']);
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
