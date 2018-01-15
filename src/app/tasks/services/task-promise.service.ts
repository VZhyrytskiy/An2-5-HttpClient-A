import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { toPromise } from 'rxjs/operator/toPromise';

import { Task } from './../models/task.model';

@Injectable()
export class TaskPromiseService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(
    private http: HttpClient
  ) {}

  getTasks(): Promise<Task[]> {
    return this.http.get(this.tasksUrl)
            .toPromise()
            .then( response => <Task[]>response )
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
