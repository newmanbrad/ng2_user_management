import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UsersService } from "./users.service";

@Component({
  moduleId: module.id,
  selector: 'user-edit',
  templateUrl: 'user-edit.template.html'
})
export class UserEditComponent implements OnInit{
  userId: string;

  constructor(private _userService: UsersService,
              private _route: ActivatedRoute
              ){ }

  ngOnInit () {
    this._route.params.forEach((params: Params) => {
      this.userId = params['id'];
    })
  }

}
