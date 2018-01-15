import { Injectable } from '@angular/core';

import { Task } from './../models/task.model';

const taskList = [
  new Task(1, 'Estimate', 1, 8, 8, true),
  new Task(2, 'Create', 2, 8, 4, false),
  new Task(3, 'Deploy', 3, 8, 0, false)
];

const taskListPromise = Promise.resolve(taskList);

@Injectable()
export class TaskArrayService {

  getTasks(): Promise<Task[]> {
    return taskListPromise;
  }

  getTask(id: number | string): Promise<Task> {
    return this.getTasks()
      .then(tasks => tasks.find(task => task.id === +id))
      .catch(() => Promise.reject('Error in getTask method'));
  }

  addTask(task: Task): void {
    taskList.push(task);
  }

  updateTask(task: Task): void {
    const i = taskList.findIndex(t => t.id === task.id);

    if (i > -1) {
      taskList.splice(i, 1, task);
    }
  }

  completeTask(task: Task): void {
    task.done = true;
  }
}
