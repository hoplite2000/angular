import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish;
  promotion;
  leader;

  constructor(private promotionservice: PromotionService, private dishservice: DishService, private leaderservice: LeaderService, @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish()
      .subscribe((dish) => this.dish = dish);
    this.promotionservice.getFeaturedPromotion()
      .subscribe((promotion) => this.promotion = promotion);
    this.leaderservice.getFeaturedLeader()
      .subscribe((leader) => this.leader = leader);
  }

}
