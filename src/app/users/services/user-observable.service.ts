import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import './../../services/rxjs-extensions';

import { User } from './../../models/user';

@Injectable()
export class UserObservableService {
  private usersUrl = 'http://localhost:3000/users';

  constructor(
    private http: Http
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(this.handleData)
      .catch(this.handleError);
  }

  getUser(id: number): Observable<User> {
    return this.http.get(`${this.usersUrl}/${id}`)
      .map(this.handleData)
      .catch(this.handleError);

  }

  updateUser(user: User): Observable<User> {
     const url = `${this.usersUrl}/${user.id}`,
        body = JSON.stringify(user),
        headers = new Headers({'Content-Type': 'application/json'}),
        options = new RequestOptions();

    options.headers = headers;

    return this.http.put(url, body, options)
            .map( this.handleData )
            .catch(this.handleError);
  }


  createUser(user: User): Observable<User> {
    const url = this.usersUrl,
        body = JSON.stringify(user),
        headers = new Headers({'Content-Type': 'application/json'}),
        options = new RequestOptions();

    options.headers = headers;

    return this.http.post(url, body, options)
            .map( this.handleData )
            .catch( this.handleError );
  }


  deleteUser(user: User) {

  }

  private handleData(response: Response) {
    const body = response.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message)
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
