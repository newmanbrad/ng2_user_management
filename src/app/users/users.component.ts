import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, trigger, state, style, animate, transition  } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UsersService } from "./users.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-contact',
  templateUrl: 'users.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ FormBuilder ],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.6s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private debugComponent: boolean = true;
  public user$:Array<Object>;
  msg = 'Loading users ...';

  constructor(private usersService: UsersService, private router: Router) {

  }

  // life cycle events
  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.msg = '';
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  getUsers() {

    this.subscription = this.usersService.getUsers().subscribe(
      // the first argument is a function which runs on success
      data => { this.user$ = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => this.debugComponent && console.log('done loading users')
    );

  }

}
