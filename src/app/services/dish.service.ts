import { Injectable } from '@angular/core';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(){
    return DISHES;
  }

  getFeaturedDish(){
    return DISHES.filter((dish) => (dish.featured))[0];
  }

  getDish(id){
    return DISHES.filter((dish) => (dish.id === id))[0];
  }
}
