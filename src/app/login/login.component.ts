import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from "./../users/users.service";
import { GlobalEventsManager } from "../shared/services/";

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent {
  @Input() username: string;
  @Input() password: string;

  private debug: boolean = false;

  constructor(private _usersService: UsersService,
              private _router: Router,
              private _globalEventsManager: GlobalEventsManager
              ) { }

  login(): void {
    this.debug && console.info('login.component: login method fired.');
    this._usersService.authUser(this.username, this.password).subscribe(data => this.checkSuccess(data));
  }

  /**
   *  checkSuccess
   *  If auth is successful redirect to home.
   */

  checkSuccess(success: boolean): void {
    this.debug && console.info('login.component: check success method fired.');
    if(success){
      this._globalEventsManager.userloggedIn.emit(success);
      this._router.navigate(['/home']);
    }
  }

}
