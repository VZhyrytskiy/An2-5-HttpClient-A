import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

import { Task } from './../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  @Input()  task: Task;

  @Output() complete = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  completeTask(): void {
    this.complete.emit(this.task);
  }

  deleteTask() {
    this.delete.emit(this.task);
  }

  editTask() {
    this.edit.emit(this.task);
  }
}
