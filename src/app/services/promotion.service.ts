import { Injectable } from '@angular/core';
//import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseUrl } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private processhttpmsg: ProcessHTTPmsgService) { }

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseUrl + 'promotions').pipe(catchError(this.processhttpmsg.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion>{
    return this.http.get<Promotion[]>(baseUrl + 'promotions?featured=true').pipe(map(promotions => promotions[0])).pipe(catchError(this.processhttpmsg.handleError));
  }

  getPromotion(id): Observable<Promotion>{
    return this.http.get<Promotion>(baseUrl + 'promotions/' +id).pipe(catchError(this.processhttpmsg.handleError));
  }
}
