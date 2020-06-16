import { Injectable } from '@angular/core';
//import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient, private processhttpmsg: ProcessHTTPmsgService) { }

  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(baseUrl + 'dishes').pipe(catchError(this.processhttpmsg.handleError));
  }

  getFeaturedDish(): Observable<Dish>{
    return this.http.get<Dish[]>(baseUrl + 'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processhttpmsg.handleError));
  }

  getDish(id): Observable<Dish>{
    return this.http.get<Dish>(baseUrl + 'dishes/' + id).pipe(catchError(this.processhttpmsg.handleError));
  }

  getdishIDs(): Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(error => error));
  }
}
