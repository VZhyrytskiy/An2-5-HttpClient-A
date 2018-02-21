import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

// rxjs
import { switchMap } from 'rxjs/operators';

import { Task } from './../../models/task.model';
import { TaskPromiseService } from './../../services';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task;

  constructor(
    private taskPromiseService: TaskPromiseService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.task = new Task(null, '', null, null);

    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          return params.get('taskID')
            ? this.taskPromiseService.getTask(+params.get('taskID'))
            : Promise.resolve(null);
        })
      )
      .subscribe(task => (this.task = { ...task }), err => console.log(err));
  }

  saveTask() {
    const task = { ...this.task };

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.goBack())
      .catch(err => console.log(err));
  }

  goBack(): void {
    this.location.back();
  }
}
