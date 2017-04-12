import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Task } from './../../models/task';

@Injectable()
export class TaskPromiseService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(
    private http: Http
  ) {}

  getTasks(): Promise<Task[]> {
    return this.http.get(this.tasksUrl)
            .toPromise()
            .then( response => <Task[]>response.json() )
            .catch(this.handleError);
  }

  getTask(id: number): Promise<Task> {
    return this.http.get(`${this.tasksUrl}/${id}`)
            .toPromise()
            .then( response => <Task>response.json() )
            .catch(this.handleError);
  }

  updateTask(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`,
        body = JSON.stringify(task),
        headers = new Headers({'Content-Type': 'application/json'}),
        options = new RequestOptions();

    options.headers = headers;

    return this.http.put(url, body, options)
            .toPromise()
            .then( response => <Task>response.json() )
            .catch( this.handleError );
  }

  createTask(task: Task): Promise<Task> {
    const url = this.tasksUrl,
        body = JSON.stringify(task),
        headers = new Headers({'Content-Type': 'application/json'}),
        options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
            .toPromise()
            .then( response => <Task>response.json() )
            .catch( this.handleError );
  }

  deleteTask(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`;

    return this.http.delete(url)
            .toPromise()
            .then( response => <Task>response.json() )
            .catch( this.handleError );
}





  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
