import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {TestData} from '../data/TestData';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskDAOArray} from '../dao/impl/TaskDAOArray';
import {CategoryDAOArray} from '../dao/impl/CategoryDAOArray';
import {Priority} from '../model/Priority';
@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private taskDaoArray = new TaskDAOArray();
  private categoryDaoArray = new CategoryDAOArray();


  constructor() {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();

  }


  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }


  getAllCategories(): Observable<Category[]>{
    return  this.categoryDaoArray.getAll();
  }
  // поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }
}
