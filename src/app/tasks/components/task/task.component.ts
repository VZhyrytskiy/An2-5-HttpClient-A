import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';

import { Task } from './../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  @Input() task: Task;

  @Output() completeTask = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  onCompleteTask(): void {
    this.completeTask.emit(this.task);
  }

  onEditTask() {
    this.editTask.emit(this.task);
  }

  onDeleteTask() {
    this.deleteTask.emit(this.task);
  }
}
