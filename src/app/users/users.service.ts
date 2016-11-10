import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { User } from './user.model';
import { IUser } from '../shared/interfaces';
import { serviceUrls } from '../shared/service-urls';

/**
 * debugService: output method info to console.
 *
 * @type {boolean}
 */

const debugService: boolean = true;

@Injectable()
export class UsersService {

  public loggedIn: boolean = false;

  constructor (private http: Http, private authHttp: AuthHttp) {
    // check authentication on creation
    this.loggedIn = !!localStorage.getItem('token');
  }

  authUser(username, password): Observable<boolean> {

    debugService && console.info('users.service: authUser method fired, Data:', username, password);

    let body = '{"username": "' + username.trim() + '","password": "' + password.trim() + '"}';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(serviceUrls.userAuthUrl, body, options)
      .map((Response) => { return this.setAuthToken(this.extractData(Response))})
      .catch(this.handleError);
  }

  public logout(): void {

    debugService && console.info('users.service: logout method fired');

    this.removeUserLocalStorage();
  }

  public isLoggedIn(): boolean {

    debugService && console.info('users.service: isLoggedIn method fired');

    return this.loggedIn;
  }

  public getUsers () {

    debugService && console.info('users.service: getUsers method fired');

    return this.authHttp.get(serviceUrls.usersUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getUserById (id): Observable<User> {

    debugService && console.info('users.service: getUserById method fired');

    //let query = '{"_id": "' + id.trim() + '"}';

    let query =  '?findById=' +  id.trim();

    return this.authHttp.get(serviceUrls.usersUrl + query)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getUserTypes (): Observable<any> {

    debugService && console.info('users.service: getUserTypes method fired');

    return this.authHttp.get(serviceUrls.userTypesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addUser (body: Object): Observable<User[]> {

    debugService && console.info('users.service: addUser method fired, Data:', body);

    let bodyString = JSON.stringify(body);

    return this.authHttp.post(serviceUrls.usersUrl, bodyString)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public updateUser (body: Object): Observable<User[]> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    debugService && console.info('users.service: updateUser method fired, Data:', body);

    let bodyString = JSON.stringify(body);

    return this.authHttp.put(`${serviceUrls.usersUrl}/${body['_id']}`, bodyString)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteUser (id:string): Observable<User[]> {
    return this.authHttp.delete(`${serviceUrls.usersUrl}/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => this.handleError(error.json().error || 'Server error'));
  }

  /**
   * extractData: return JSON data to map to observable method.
   *
   * @param res
   * @returns {any|{}}
   */

  private extractData(res: Response) {
    let body = res.json();
    debugService && console.info('JSON data from service: ', body);
    return body || { };
  }

  /**
   * handleError: todo make this a shared method, so other services can use.
   * In a real world app, we might use a remote logging infrastructure
   * We'd also dig deeper into the error to get a better message
   *
   * @param error
   * @returns {ErrorObservable}
   */

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private setAuthToken (data: any): boolean {
    let user = data.user;
    if (user.hasOwnProperty('_id')) {
      this.setUserLocalStorage(data);
      this.loggedIn = true;
      return true;
    } else {
      return false;
    }
  }

  private setUserLocalStorage (data: any): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  private removeUserLocalStorage (): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn = false;
  }

}
