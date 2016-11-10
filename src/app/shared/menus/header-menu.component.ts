import { Component, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy, Output, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { GlobalEventsManager } from "../services/";

@Component({
  selector: 'header-menu',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'header-menu.template.html',
  host: {
    '(document:click)': 'checkClickLocation($event)'
  }
})
export class HeaderComponent implements OnInit {
  name: string = 'Application Name';
  sideMenuState: boolean = false;
  user;
  userloggedIn: boolean = false;

  constructor(public _usersService: UsersService,
              private _eref: ElementRef,
              private _globalEventsManager: GlobalEventsManager,
              private _router: Router
              ) {
    this._globalEventsManager.userloggedIn.subscribe((mode)=>{
      this.userloggedIn = mode;
      this.gatherUserInformation();
    });

  }

  ngOnInit(){
    this.gatherUserInformation();
  }

  /**
   * checkClickLocation
   * If the user clicks outside of the open side-menu, we need to assure that the menu gets closed.
   *
   * @param event
   */

  checkClickLocation(event): void{
    if (!this._eref.nativeElement.contains(event.target) && this.sideMenuState){
      this.fireSideMenu();
    }
  }

  logout(): void {
    this._usersService.logout();
    this._globalEventsManager.userloggedIn.emit(false);
    this._router.navigate(['/login']);
  }

  /**
   *  fireSideMenu
   *
   *  Adds class to app template to display the side menu.
   */

  private fireSideMenu(): void {

    if(this.sideMenuState) {
      this.sideMenuState = false;
    } else {
      this.sideMenuState = true;
    }

    console.log(this.sideMenuState);

    this._globalEventsManager.sideBarState.emit(this.sideMenuState);

  }

  private gatherUserInformation(): void {
    let currentUserData = localStorage.getItem('user');
    if(currentUserData){
      this.user = JSON.parse(currentUserData);
    }
  }
}
