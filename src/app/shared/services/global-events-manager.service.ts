import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalEventsManager {
  public userloggedIn: EventEmitter<any> = new EventEmitter();
  public sideBarState: EventEmitter<any> = new EventEmitter();

  constructor() {
  }
}
