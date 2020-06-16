import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes;

  constructor(private dishservice: DishService, @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit(): void {
    this.dishservice.getDishes()
      .subscribe((dishes) => this.dishes = dishes);
  }

}
