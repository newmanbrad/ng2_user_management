import { Component, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from "./../users/users.service";
import { GlobalEventsManager } from "../shared/services/";
import { Subscription } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @Input() username: string;
  @Input() password: string;
  private subscription: Subscription;
  private debug: boolean = false;

  constructor(private _usersService: UsersService,
              private _router: Router,
              private _globalEventsManager: GlobalEventsManager
              ) { }

  login(): void {
    this.debug && console.info('login.component: login method fired.');
    this.subscription = this._usersService.authUser(this.username, this.password).subscribe(data => this.checkSuccess(data));
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

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
