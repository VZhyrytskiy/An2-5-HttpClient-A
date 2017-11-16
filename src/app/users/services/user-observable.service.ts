import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import './../../services/rxjs-extensions';

import { User } from './../../models/user';
import { UsersAPI } from '../users.config';

@Injectable()
export class UserObservableService {

  constructor(
    private http: HttpClient,
    @Inject(UsersAPI) private usersUrl: string
  ) {}

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
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    return this.http.put(url, body, options)
            .map( this.handleData )
            .catch(this.handleError);
  }


  createUser(user: User): Observable<User> {
    const url = this.usersUrl,
      body = JSON.stringify(user),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    return this.http.post(url, body, options)
            .map( this.handleData )
            .catch( this.handleError );
  }


  deleteUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete(url)
      .map( this.handleData )
      .catch(this.handleError);
  }

  private handleData(response: HttpResponse<User>) {
    const body = response;
    return body || {};
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    else {
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}
