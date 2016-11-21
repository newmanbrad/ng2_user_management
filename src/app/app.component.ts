import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { UsersService } from './users/users.service';
import { GlobalEventsManager } from './shared/services';
const css = require('./app.style.scss');

@Component({
  selector: 'app',
  styleUrls: [
    css.toString()
  ],
  templateUrl: 'app.template.html'
})
export class App {

  name = 'Application Name';
  url = 'https://bradjnewman.com';
  userLoggedIn: boolean = false;
  sideBarState: boolean = false;

  constructor(
    public appState: AppState,
    private usersService: UsersService,
    private _globalEventsManager: GlobalEventsManager) {

    this.userLoggedIn = usersService.isLoggedIn();

    this._globalEventsManager.sideBarState.subscribe((mode)=>{
      this.sideMenuStateChange(mode);
    });

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  /**
   *  sideMenuStateChange
   *  Emitted Event from header-menu component
   *
   *  @param state
   */

  sideMenuStateChange(state) {
    this.sideBarState = state;
  }

}
