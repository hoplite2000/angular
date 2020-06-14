import { Injectable } from '@angular/core';
import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]>{
    return Promise.resolve(PROMOTIONS);
  }

  getFeaturedPromotion(): Promise<Promotion>{
    return Promise.resolve(PROMOTIONS.filter((promo) => (promo.featured))[0]);
  }

  getPromotion(id): Promise<Promotion>{
    return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  }
}
