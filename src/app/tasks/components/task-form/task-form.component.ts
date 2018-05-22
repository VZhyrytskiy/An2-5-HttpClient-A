import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

// rxjs
import { switchMap } from 'rxjs/operators';

import { Task } from './../../models/task.model';
import { TaskArrayService } from './../../services/task-array.service';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task;

  constructor(
    private taskArrayService: TaskArrayService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.task = new Task(null, '', null, null);

    // it is not necessary to save subscription to route.paramMap
    // it handles automatically
    this.route.paramMap
      .pipe(
        switchMap((params: Params) => this.taskArrayService.getTask(+params.get('taskID'))))
      .subscribe(
        task => this.task = {...task},
        err => console.log(err)
    );
  }

  onSaveTask() {
    const task = { ...this.task };

    if (task.id) {
      this.taskArrayService.updateTask(task);
    } else {
      this.taskArrayService.addTask(task);
    }

    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
