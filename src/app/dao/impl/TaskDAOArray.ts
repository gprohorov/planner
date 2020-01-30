
import {Observable, of} from 'rxjs';
import {TaskDAO} from '../interface/TaskDAO';
import {Task} from '../../model/Task';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {TestData} from '../../data/TestData';


export class TaskDAOArray implements TaskDAO {


  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(task => task.id === id)); }


    add(T): Observable<Task> {
        return undefined;
    }

    delete(id: number): Observable<Task> {
        return undefined;
    }

    getTasksByCategory(category: Category): Observable<Category[]> {
    return of(TestData.tasks.filter( task => task.category === category));
    }




    getCompletedCountInCategory(category: Category): Observable<number> {
        return undefined;
    }

    getTotalCount(): Observable<number> {
        return undefined;
    }

    getTotalCountInCategory(category: Category): Observable<number> {
        return undefined;
    }

    getUncompletedCountInCategory(category: Category): Observable<number> {
        return undefined;
    }

    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return undefined;
    }

    update(T): Observable<Task> {
        return undefined;
    }


}
