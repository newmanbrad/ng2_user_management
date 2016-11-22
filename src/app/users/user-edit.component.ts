import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'user-edit',
  templateUrl: 'user-edit.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit{
  userId: string;

  constructor(private _route: ActivatedRoute
              ){ }

  ngOnInit () {
    this._route.params.forEach((params: Params) => {
      this.userId = params['id'];
    })
  }

}
