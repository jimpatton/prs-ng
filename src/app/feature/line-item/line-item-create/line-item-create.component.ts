import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { Request } from '../../../model/request';
import { User } from '../../../model/user';
import { LineItemService } from '../../../service/line-item.service';
import { ProductService } from '../../../service/product.service';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-line-item-create',
  standalone: false,
  templateUrl: './line-item-create.component.html',
  styleUrl: './line-item-create.component.css'
})
export class LineItemCreateComponent implements OnInit, OnDestroy{
  title:string = 'Line Item Create';
  newLineItem:LineItem = new LineItem();
  subscription!:Subscription;  
  products!:Product[];  
  requestId:number = 0;
  request!:Request;
  welcomeMsg!:string;
  loggedInUser!:User;
  isAdmin:boolean = false; 

  constructor(
    private lineItemSvc: LineItemService,
    private productSvc: ProductService,    
    private requestSvc: RequestService,
    private sysSvc: SystemService,
    private router:Router,
    private actRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    //get requestId from activated route
    this.actRoute.params.subscribe(
      (parms)=>{
        this.requestId = parms['requestId'];
        //get request for requestId
        this.subscription = this.requestSvc.getById(this.requestId).subscribe({
          next: (resp) =>{
            this.request = resp;
            //set request in newLineItem
            this.newLineItem.request = this.request;        
          },
          error: (err)=>{
            console.log("Error retrieving request", err);
          },
        });
      }
    );
    // get list of products
    this.productSvc.list().subscribe({
            next: (resp) => {
              this.products = resp;
            }
          })
  }
      
  addLineItem() {
    console.log('a', this.newLineItem);
    this.subscription = this.lineItemSvc.add(this.newLineItem).subscribe({
      next: (resp) => {
        this.router.navigate(['/request-lines', this.requestId])
      },
      error: (err) => {
        console.error('Error creating line item: ' + err.message);
      },
    });
  }   

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  } 

}