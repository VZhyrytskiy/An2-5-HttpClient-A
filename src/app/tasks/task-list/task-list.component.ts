import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private tasksService: TaskPromiseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tasksService.getTasks()
      .then(tasks => this.tasks = tasks)
      .catch((err) => console.log(err));
  }

  createTask() {
    const link = ['add'];
    this.router.navigate(link);
  }


  completeTask(task: Task): void {
    task.done = true;
    this.tasksService.updateTask(task);
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task)
      .then(() => this.tasks = this.tasks.filter(t => t !== task))
      .catch(err => console.log(err));
  }

}
