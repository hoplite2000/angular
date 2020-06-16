import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPmsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback'; 

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient, private processhttpmsg: ProcessHTTPmsgService) { }

  submitfeedback(feedback: Feedback): Observable<Feedback>{
    const httpoptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Feedback>(baseUrl + 'feedback', feedback, httpoptions).pipe(catchError(this.processhttpmsg.handleError));
  }
}
