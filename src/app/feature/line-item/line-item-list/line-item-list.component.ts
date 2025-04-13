import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { Product } from '../../../model/product';
import { User } from '../../../model/user';
import { LineItemService } from '../../../service/line-item.service';
import { RequestService } from '../../../service/request.service';
import { ProductService } from '../../../service/product.service';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-item-list',
  standalone: false,
  templateUrl: './line-item-list.component.html',
  styleUrl: './line-item-list.component.css'
})
export class LineItemListComponent implements OnInit, OnDestroy{
title:string = "Line Item List";
lineItems!:LineItem[];
requests!:Request[];
products!:Product[];
subscription!:Subscription;
welcomeMsg!:string;
loggedInUser!:User;
isAdmin:boolean = false;


constructor(
  private lineItemSvc:LineItemService,
  private requestSvc:RequestService,
  private productSvc:ProductService,
  private userSvc:UserService,
  private sysSvc:SystemService
){}




  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.subscription = this.lineItemSvc.list().subscribe(
      (resp) => {
        this.lineItems = resp;
      });
  } 

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id:number){    
    this.subscription = this.lineItemSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.lineItemSvc.list().subscribe((resp) => {
        this.lineItems = resp;  
      });   
    },
    error: (err) =>{
      console.log('Error deleting line item: ' +id);
      alert('Error deleting line item for id: '+id);
    }
  });
  }

}
