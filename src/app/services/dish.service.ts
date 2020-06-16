import { Injectable } from '@angular/core';
//import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../shared/baseurl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient) { }

  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(baseUrl + 'dishes');
  }

  getFeaturedDish(): Observable<Dish>{
    return this.http.get<Dish[]>(baseUrl + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }

  getDish(id): Observable<Dish>{
    return this.http.get<Dish>(baseUrl + 'dishes/' + id);
  }

  getdishIDs(): Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }
}
