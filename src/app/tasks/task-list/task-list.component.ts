import { Component, OnInit } from '@angular/core';

import { Task } from './../../models/task';
import { TaskArrayService } from './../services/task-array.service';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;

  constructor(
    private taskArrayService: TaskArrayService) { }

  ngOnInit() {
    console.log(this.tasks);
    this.taskArrayService.getTasks()
      .then(tasks => this.tasks = tasks)
      .catch((err) => console.log(err));
  }

  completeTask(task: Task): void {
    this.taskArrayService.completeTask(task);
  }
}
