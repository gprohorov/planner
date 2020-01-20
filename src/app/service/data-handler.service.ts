import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {TestData} from '../data/TestData';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataHandlerService {

  taskSubject = new Subject<Task[]>();

  constructor() { }

  getCategories(): Category[] {
    return  TestData.categories;
}
  getTasks(): Task[] {
    return TestData.tasks;
  }

  fetchTasks(){
    this.taskSubject.next(TestData.tasks);
  }

  getTasksByCategory(category: Category): Task[] {
    const tasks = TestData.tasks.filter(task => task.category === category);
   console.log(tasks);
    return tasks;
  }

  fetchTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category);
   console.log(tasks);
   this.taskSubject.next(tasks);
  }

}
