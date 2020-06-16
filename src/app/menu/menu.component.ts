import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { flyinout, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host:{'[@flyinout]':'true', 'style': 'display: block;'},
  animations: [flyinout(), expand()]
})
export class MenuComponent implements OnInit {

  dishes;
  errmsg: string;

  constructor(private dishservice: DishService, @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit(): void {
    this.dishservice.getDishes()
      .subscribe((dishes) => this.dishes = dishes,
        errmsg => this.errmsg = <any>errmsg);
  }

}
