import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';

import { User } from './../models/user.model';
import { UsersAPI } from './../users.config';

@Injectable()
export class UserObservableService {
  constructor(
    private http: HttpClient,
    @Inject(UsersAPI) private usersUrl: string
  ) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError));
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.get<User>(url).pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`,
      body = JSON.stringify(user),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    return this.http
      .put<User>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  createUser(user: User): Observable<User> {
    const url = this.usersUrl,
      body = JSON.stringify(user),
      options = {
        // можно передавать объект конструктору, а можно вызывать метод set
        // приэтом класс является immutable, каждый раз возвращается новый инстанс.
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'my-auth-key'),

        // добавление URL Query параметров: this.usersUrl?id=3
        params: new HttpParams().set('id', '3')
      };

    return this.http
      .post<User>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  deleteUser(user: User): Observable<User[]> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete(url).pipe(concatMap(() => this.getUsers()));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${
        err.error
      }`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
