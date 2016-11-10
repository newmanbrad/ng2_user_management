import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalEventsManager {
  public userloggedIn: EventEmitter<boolean> = new EventEmitter();
  public sideBarState: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }
}
