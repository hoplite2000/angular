import { Injectable } from '@angular/core';
import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]>{
    return Promise.resolve(DISHES);
  }

  getFeaturedDish(): Promise<Dish>{
    return Promise.resolve(DISHES.filter((dish) => (dish.featured))[0]);
  }

  getDish(id): Promise<Dish>{
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }
}
