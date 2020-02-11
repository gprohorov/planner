
import {Observable, of} from 'rxjs';
import {PriorityDAO} from '../interface/PriorityDAO';
import {Priority} from '../../model/Priority';
import {TestData} from '../../data/TestData';


export class PriorityDAOArray implements PriorityDAO {
    add(T): Observable<Priority> {
        return undefined;
    }

    delete(id: number): Observable<Priority> {
        return undefined;
    }

    get(id: number): Observable<Priority> {
        return undefined;
    }

    getAll(): Observable<Priority[]> {
        return of(TestData.priorities);
    }

    update(T): Observable<Priority> {
        return undefined;
    }

}
