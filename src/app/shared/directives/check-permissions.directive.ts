import {Directive, ElementRef, Input} from '@angular/core';
@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {
  @Input('hasPermission') permission: string;
  perms:[string] = ['ViewCompA', 'ViewCompC'];

  constructor() { }

  ngOnInit() {
    console.log('fire');
    if(this.perms.indexOf(this.permission) === -1) {

    }
  }
}
