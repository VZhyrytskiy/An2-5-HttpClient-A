import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

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
           .map( this.handleData )
           .catch(this.handleError);
  }

  // Case 1 Handle Body {observe: 'body'}
  // getUser(id: number): Observable<User> {
  //   return this.http.get(`${this.usersUrl}/${id}`, {observe: 'body'})
  //     .map(this.handleData1)
  //     .catch(this.handleError);
  // }

  // private handleData1(response: User) {
  //   console.log(response);
  //   const body = response;
  //   return body || {};
  // }
  // End Case 1

  // Case 2: Handle Response { observe: 'response' }
  // getUser(id: number): Observable<User> {
  //   return this.http.get<User>(`${this.usersUrl}/${id}`, {observe: 'response'})
  //     .map(this.handleData2)
  //     .catch(this.handleError);
  // }

  // private handleData2(response: HttpResponse<User>) {
  //   console.log(response);
  //   const body = response.body;
  //   return body || {};
  // }
  // End Case 2

  // Case 3: Specify HttpResponse Type get<T>
  // getUser(id: number): Observable<User> {
  //   return this.http.get<User>(`${this.usersUrl}/${id}`)
  //     .map(this.handleData3)
  //     .catch(this.handleError);
  // }

  // private handleData3(response: User) {
  //   console.log(response);
  //   const body = response;
  //   return body || {};
  // }
  // End Case 3

  // Case 4: responseType: text
  // getUser(id: number): Observable<User> {
  //   return this.http.get(`${this.usersUrl}/${id}`, {responseType: 'text'})
  //     .map(this.handleData4)
  //     .catch(this.handleError);
  // }

  // private handleData4(response: string) {
  //   console.log(response);
  //   const body = JSON.parse(response);
  //   return body || {};
  // }
  // End Case 4

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
        // можно передавать объект конструктору, а можно вызывать метод set
        // приэтом класс является immutable, каждый раз возвращается новый инстанс.
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'my-auth-key'),

        // добавление URL Query параметров: this.usersUrl?id=3
        params: new HttpParams()
          .set('id', '3')
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
