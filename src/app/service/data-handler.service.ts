import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {TestData} from '../data/TestData';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataHandlerService {

  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() {
    this.fetchTasks();
  }

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
