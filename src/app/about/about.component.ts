import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders;

  constructor(private leaderservice: LeaderService, @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit(): void {
    this.leaderservice.getLeaders()
      .subscribe((leaders) => this.leaders = leaders)
  }

}
