import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// rxjs
import { switchMap } from 'rxjs/operators';

import { TaskModel } from './../../models/task.model';
import { TaskArrayService, TaskPromiseService } from './../../services';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: TaskModel;

  constructor(
    private taskArrayService: TaskArrayService,
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.task = new TaskModel();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.taskPromiseService.getTask(+params.get('taskID'))
        )
      )
      .subscribe(task => (this.task = { ...task }), err => console.log(err));
  }

  onSaveTask() {
    const task = { ...this.task };

    if (task.id) {
      this.taskPromiseService.updateTask(task).then(() => this.onGoBack());
    } else {
      this.taskArrayService.createTask(task);
      this.onGoBack();
    }
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
