import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { flyinout, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{'[@flyinout]':'true', 'style': 'display: block;'},
  animations: [flyinout(), expand()]
})
export class AboutComponent implements OnInit {

  leaders;
  errmsg:string;

  constructor(private leaderservice: LeaderService, @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit(): void {
    this.leaderservice.getLeaders()
      .subscribe((leaders) => this.leaders = leaders,
        errmsg => this.errmsg = <any>errmsg);
  }

}
