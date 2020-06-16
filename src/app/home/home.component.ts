import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { flyinout, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{'[@flyinout]':'true', 'style': 'display: block;'},
  animations: [flyinout(), expand()]
})
export class HomeComponent implements OnInit {

  dish;
  promotion;
  leader;
  disherrmsg:string;
  leadererrmsg:string;
  promotionerrmsg:string;

  constructor(private promotionservice: PromotionService, private dishservice: DishService, private leaderservice: LeaderService, @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish()
      .subscribe((dish) => this.dish = dish,
        errmsg => this.disherrmsg = <any>errmsg);
    this.promotionservice.getFeaturedPromotion()
      .subscribe((promotion) => this.promotion = promotion,
        errmsg => this.promotionerrmsg = <any>errmsg);
    this.leaderservice.getFeaturedLeader()
      .subscribe((leader) => this.leader = leader,
        errmsg => this.leadererrmsg = <any>errmsg);
  }

}
