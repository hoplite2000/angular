import { Injectable } from '@angular/core';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(){
    return PROMOTIONS;
  }

  getFeaturedPromotion(){
    return PROMOTIONS.filter((promo) => (promo.featured))[0];
  }

  getPromotion(id){
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }
}
