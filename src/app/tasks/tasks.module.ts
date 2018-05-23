import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import {
  TaskComponent,
  TaskFormComponent,
  TaskListComponent,
  TaskPromiseService
} from '.';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskComponent],
  imports: [CommonModule, FormsModule, TasksRoutingModule],
  providers: [TaskPromiseService]
})
export class TasksModule {}
