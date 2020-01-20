import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {TestData} from '../data/TestData';

@Injectable()
export class DataHandlerService {

  constructor() { }

  getCategories(): Category[] {
    return  TestData.categories;
}
  getTasks(): Task[] {
    return TestData.tasks;
  }

  getTasksByCategory(category: Category): Task[] {
    const tasks = TestData.tasks.filter(task => task.category === category);
   console.log(tasks)
    return tasks;
  }

}
