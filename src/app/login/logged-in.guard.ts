import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './../users/users.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private _usersService: UsersService,
              private _router: Router
              ) {}

  /**
   *  canActivate:
   *
   *  If the user is not authenticated for a checked route.
   *  Return the user back to the login page.
   *
   *  @returns {boolean}
   */
  canActivate(): boolean {

    if (!this._usersService.isLoggedIn()) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;

  }
}
