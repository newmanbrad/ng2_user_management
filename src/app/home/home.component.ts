import { Component } from '@angular/core';
import { AppState } from '../app.service';
import { Title } from './title';

@Component({
  selector: 'home',
  providers: [
    Title
  ],
  templateUrl: './home.template.html'
})
export class Home {
  // Set our default values
  localState = { value: '' };
  appTitle = 'App Title';
  // TypeScript public modifiers
  constructor(public appState: AppState,
              public title: Title
              ) { }

  ngOnInit() {
    this.title.getData().subscribe(data => this.appTitle = data);
  }

  submitState(value: string): void {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
