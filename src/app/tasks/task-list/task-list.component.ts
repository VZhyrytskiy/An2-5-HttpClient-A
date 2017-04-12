import { Component, OnInit } from '@angular/core';

import { Task } from './../../models/task';
import { TaskArrayService, TaskPromiseService } from './../';

@Component({
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;

  constructor(
    private taskArrayService: TaskArrayService,
    private taskPromiseService: TaskPromiseService)
  { }

  ngOnInit() {
    this.taskPromiseService.getTasks()
      .then(tasks => this.tasks = tasks)
      .catch((err) => console.log(err));
  }

  completeTask(task: Task): void {
    task.done = true;
    this.taskPromiseService.updateTask(task);
  }
}
