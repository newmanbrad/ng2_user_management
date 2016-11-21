import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { GlobalEventsManager } from "../services/";

@Component({
  selector: 'sidebar-menu',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'sidebar-menu.template.html'
})
export class SideBarMenuComponent {
  userloggedIn: boolean = false;

  constructor(private _usersService: UsersService,
              public _globalEventsManager: GlobalEventsManager,
              private _router: Router
              ) {

    this._globalEventsManager.userloggedIn.subscribe((mode)=>{
      this.userloggedIn = mode;
    });
  }

  private logout() {
    this._usersService.logout();
    this._router.navigate(['/login']);
  }

}
