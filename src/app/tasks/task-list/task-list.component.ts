import { Component, OnInit } from '@angular/core';

import { Task } from './../../models/task';
import { TaskPromiseService } from './../';

@Component({
  selector: 'task-list',
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;

  constructor(
    private tasksService: TaskPromiseService) { }

  ngOnInit() {
    this.tasksService.getTasks()
      .then(tasks => this.tasks = tasks)
      .catch((err) => console.log(err));
  }

  completeTask(task: Task): void {
    task.done = true;
  }
}
