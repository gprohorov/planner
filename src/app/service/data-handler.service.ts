import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {TestData} from '../data/TestData';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskDAOArray} from '../dao/impl/TaskDAOArray';
import {CategoryDAOArray} from '../dao/impl/CategoryDAOArray';
import {Priority} from '../model/Priority';
import {PriorityDAOArray} from '../dao/impl/PriorityDAOArray';
@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new TaskDAOArray();
  private categoryDaoArray = new CategoryDAOArray();
  private priorityDaoArray = new PriorityDAOArray();

  constructor() {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  getAllCategories(): Observable<Category[]>{
    return  this.categoryDaoArray.getAll();
  }

  getAllPriorities(): Observable<Priority[]>{
    return  this.priorityDaoArray.getAll();
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }



  // поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }


  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id);
  }


  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArray.delete(id);
  }


  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task);
  }

  addCategory(title: string): Observable<Category> {
    return this.categoryDaoArray.add(new Category(null, title));
  }




}
