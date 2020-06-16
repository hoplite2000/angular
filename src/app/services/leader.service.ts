import { Injectable } from '@angular/core';
//import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseUrl } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processhttpmsg: ProcessHTTPmsgService) { }

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseUrl + 'leadership').pipe(catchError(this.processhttpmsg.handleError));

  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get<Leader[]>(baseUrl + 'leadership?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processhttpmsg.handleError));
  }

  getLeader(id): Observable<Leader>{
    return this.http.get<Leader>(baseUrl + 'leadership/' +id).pipe(catchError(this.processhttpmsg.handleError));
    ;
  }

}
