import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Task } from './../../models/task';
import { TaskArrayService, TaskPromiseService } from './..';

@Component({
  templateUrl: 'task-form.component.html',
  styleUrls: ['task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: Task;

  constructor(
    private tasksService: TaskArrayService,
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.task = new Task(null, '', null, null);

    // it is not necessary to save subscription to route.params
    // it handles automatically
    this.route.params
      .switchMap((params: Params) => this.taskPromiseService.getTask(+params['id']))
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
