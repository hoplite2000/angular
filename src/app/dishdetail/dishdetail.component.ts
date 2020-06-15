import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service'; 
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish;
  prev: string;
  next: string;
  dishIDs: string[];

  constructor(private dishservice: DishService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dishservice.getdishIDs()
      .subscribe((dishids) => this.dishIDs = dishids);

    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe((dish) => {this.dish = dish; this.nextprev(dish.id);}); 
  }

  goBack(){
    this.location.back();
  }

  nextprev(dishid){
    const index = this.dishIDs.indexOf(dishid);
    this.prev = this.dishIDs[(this.dishIDs.length + index -1)%this.dishIDs.length];
    this.next = this.dishIDs[(this.dishIDs.length + index +1)%this.dishIDs.length];
  }

}
