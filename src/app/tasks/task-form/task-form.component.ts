import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Task } from './../../models/task';
import { TaskArrayService } from './../services/task-array.service';
import { TaskPromiseService } from './../services/task-promise.service';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: Task;

  constructor(
    private taskArrayService: TaskArrayService,
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.task = new Task(null, '', null, null);

    this.route.paramMap
      .switchMap((params: Params) => {
        return params.get('id')
          ? this.taskPromiseService.getTask(+params.get('id'))
          : Promise.resolve(null);
      })
      .subscribe(
        task => this.task = Object.assign({}, task),
        err => console.log(err)
    );
  }

  ngOnDestroy(): void {
  }

  saveTask() {
    const task = new Task(
      this.task.id,
      this.task.action,
      this.task.priority,
      this.task.estHours
    );

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
