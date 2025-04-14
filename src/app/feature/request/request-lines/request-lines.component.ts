import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-request-lines',
  standalone: false,
  templateUrl: './request-lines.component.html',
  styleUrl: './request-lines.component.css'
})
export class RequestLinesComponent implements OnInit, OnDestroy {
  title:string = "Purchase Request Line Items";
  subscription!:Subscription;
  requestId:number = 0;
  request!:Request;
  lineItems!:LineItem[];
  newLineItem:LineItem = new LineItem();
  welcomeMsg!:string;
  loggedInUser!:User;
  isAdmin:boolean = false;

constructor(
  private requestSVC:RequestService,
  private sysSvc:SystemService,
  private lineItemSvc:LineItemService,
  private router:Router,
  private actRoute:ActivatedRoute,

){}


ngOnInit(): void {
  this.loggedInUser = this.sysSvc.loggedInUser;
  this.isAdmin = this.loggedInUser.admin;
  this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
  //get requestId from URL
  //get request for requestId
  //get lineItems for requestId
  this.actRoute.params.subscribe((parms) => {
    this.requestId = parms['id'];
    this.subscription = this.requestSVC.getById(this.requestId).subscribe({
      next:(resp) =>{
        this.request = resp;        
      },
      error:(err) =>{
        console.log('Error retrieving request',err);
    },
    });
    this.subscription = this.lineItemSvc.getLineItemsForRequestId(this.requestId).subscribe({
      next:(resp) => {
        this.lineItems = resp;
        },
      error:(err)=> {
        console.log('Error retrieving line items for request', err);
      },
    });
  });
}
ngOnDestroy(): void {
  this.subscription?.unsubscribe();
}

compRequest(a:Request, b:Request){
  return a && b && a.id == b.id;
}

refreshLineItems() {
  this.subscription = this.lineItemSvc.getLineItemsForRequestId(this.requestId).subscribe({
    next: (resp) => {
      this.lineItems = resp;
    },
    error: (err) => {
      console.log('Error retrieving line items for request', err);
    },
  });
}

delete(id:number){
  // console.log("delete li", id);
    this.subscription = this.lineItemSvc.delete(id).subscribe({
      next: () => {
       this.refreshLineItems();
       this.router.navigateByUrl('/request-list');
      },   
    error: (err) =>{
      console.log('Error deleting product: ' +id);
      alert('Error deleting product for id: '+id);
    }
  });
  }
  
submit(){
 this.subscription = this.requestSVC.update(this.request).subscribe({
      next: (resp) => {        
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error('Error creating request: ' + err.message);
      },
    });
  }

}