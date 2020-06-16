import { Injectable } from '@angular/core';
//import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseUrl } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseUrl + 'leadership');

  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get<Leader[]>(baseUrl + 'leadership?featured=true').pipe(map(dishes => dishes[0]));
  }

  getLeader(id): Observable<Leader>{
    return this.http.get<Leader>(baseUrl + 'leadership/' +id);
    ;
  }

}
