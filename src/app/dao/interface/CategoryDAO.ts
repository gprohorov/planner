
import {CommonDAO} from './CommonDAO';
import {Observable} from 'rxjs';
import {Category} from '../../model/Category';


export interface CategoryDAO extends CommonDAO<Category> {

    search(title: string): Observable<Category[]>;

}
