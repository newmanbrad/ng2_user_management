import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: 'users-list.template.html'
})
export class UsersListComponent {
  @Input() users;

  constructor(private _router: Router){
  }

  editUser(id: string): void{
    this._router.navigate(['/user/edit', id]);
  }

}
