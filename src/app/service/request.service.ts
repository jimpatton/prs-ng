import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/request';
import { LineItem } from '../model/line-item';


const URL = 'http://localhost:8080/api/requests';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  list(): Observable<Request[]> {
    return this.http.get(URL + '/') as Observable<Request[]>;
  }

  add(request: Request): Observable<Request> {
    return this.http.post(URL, request) as Observable<Request>;
  }

  update(request: Request): Observable<Request> {
    return this.http.put(
      URL + '/submit-review/' + request.id,
      request
    ) as Observable<Request>;
  }

  approve(request:Request): Observable<Request> {
    return this.http.put(
      URL + '/approve/' + request.id,
      request) as Observable<Request>;    
  }

  reject(request:Request): Observable<Request> {
    return this.http.put(
      URL + '/reject/' + request.id,
      request) as Observable<Request>;
  }

  getById(id: number): Observable<Request> {
    return this.http.get(URL + '/' + id) as Observable<Request>;
  }

  getListReview(userId: number): Observable<Request> {
    return this.http.get(URL + '/list-review/' + userId) as Observable<Request>;
  }

  delete(id: number): Observable<Request> {
    return this.http.delete(URL + '/' + id) as Observable<Request>;
  }

getLineItemsForRequestId(requestId:number): Observable<LineItem[]> {
    return this.http.get(URL + '/lines-for-req/'+ requestId) as Observable<LineItem[]>;
  }

}