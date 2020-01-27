import {Task} from '../../../../../Desktop/Todo/src/app/model/Task';
import {Category} from '../../../../../Desktop/Todo/src/app/model/Category';
import {CommonDAO} from './CommonDAO';
import {Priority} from '../../../../../Desktop/Todo/src/app/model/Priority';
import {Observable} from 'rxjs';


export interface TaskDAO extends CommonDAO<Task> {


    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;


    getCompletedCountInCategory(category: Category): Observable<number>;


    getUncompletedCountInCategory(category: Category): Observable<number>;


    getTotalCountInCategory(category: Category): Observable<number>;


    getTotalCount(): Observable<number>;

}
