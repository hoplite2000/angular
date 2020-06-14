import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]>{
    return Promise.resolve(LEADERS);
  }

  getFeaturedLeader(): Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader) => (leader.featured))[0]);
  }

  getLeader(id): Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }

}
