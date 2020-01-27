import {Category} from '../../../../../Desktop/Todo/src/app/model/Category';
import {CommonDAO} from './CommonDAO';
import {Observable} from 'rxjs';


export interface CategoryDAO extends CommonDAO<Category> {


    search(title: string): Observable<Category[]>;

}
