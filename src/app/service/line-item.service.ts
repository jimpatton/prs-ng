import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineItem } from '../model/line-item';
import { Observable } from 'rxjs';


const URL = 'http://localhost:8080/api/lineitems'

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor(private http: HttpClient) { }

  list(): Observable<LineItem[]>{
    return this.http.get(URL + '/') as Observable<LineItem[]>;
  }
  
  add(lineItem:LineItem):Observable<LineItem>{
    return this.http.post(URL,lineItem) as Observable<LineItem>;
  }
  
  update(lineItem:LineItem):Observable<LineItem>{
    return this.http.put(URL +'/'+ lineItem.id, lineItem) as Observable<LineItem>;
  }
  
  getById(id:number):Observable<LineItem>{
    return this.http.get(URL + '/' + id) as Observable<LineItem>;
  }
  
  delete(id:number):Observable<LineItem>{
    return this.http.delete(URL + '/' + id) as Observable<LineItem>;
  }

  getLineItemsForRequestId(requestId:number): Observable<LineItem[]> {
    return this.http.get(URL + '/lines-for-req/'+ requestId) as Observable<LineItem[]>;
  }
}
