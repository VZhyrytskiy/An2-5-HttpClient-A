import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent, TaskFormComponent } from '.';

const tasksRoutes: Routes = [
  {
    path: 'home',
    component: TaskListComponent
  },
  {
    path: 'add',
    component: TaskFormComponent
  },
  {
    path: 'edit/:id',
    component: TaskFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(tasksRoutes)
  ]
})
export class TasksRoutingModule { }
