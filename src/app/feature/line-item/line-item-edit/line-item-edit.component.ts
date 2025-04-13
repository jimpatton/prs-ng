import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { Product } from '../../../model/product';
import { User } from '../../../model/user';
import { LineItemService } from '../../../service/line-item.service';
import { RequestService } from '../../../service/request.service';
import { ProductService } from '../../../service/product.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from '../../../model/vendor';

@Component({
  selector: 'app-line-item-edit',
  standalone: false,
  templateUrl: './line-item-edit.component.html',
  styleUrl: './line-item-edit.component.css'
})
export class LineItemEditComponent implements OnInit, OnDestroy{
  title:string = "Line Item Edit";
  lineItemId!:number;
  lineItem!:LineItem;
  subscription!:Subscription;
  requests:Request[]=[];
  products!:Product[];
  vendors:Vendor[]=[];
  welcomeMsg!:string;
  loggedInUser!:User;
  isAdmin:boolean = false;

  constructor(
    private lineItemSvc:LineItemService,
    private requestSvc:RequestService,
    private productSvc:ProductService,
    private sysSvc:SystemService,
    private router:Router,
    private actRoute:ActivatedRoute,
  ){}
  
  ngOnInit(): void {    
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;   
    this.actRoute.params.subscribe((params) => {     
      this.lineItemId = params['id'];
      this.subscription = this.lineItemSvc.getById(this.lineItemId).subscribe({
        next: (resp) => {
          this.lineItem = resp;  

          this.productSvc.list().subscribe({
            next: (resp) => {
              this.products = resp;
            }
          })
          
          


        },
        error: (err) => {
          console.error('Error getting line item for id: ' + this.lineItemId);          
        },
      });
    });
    this.subscription = this.requestSvc.list().subscribe({
      next: (resp) => {
        this.requests = resp;
      },
      error: (err) => {
        console.error(
          'Product Create Error: error loading request.' + err.message
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  save() {
    this.subscription = this.lineItemSvc.update(this.lineItem).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/line-items-list');
      },
      error: (err) => {
        console.error('Error editing line item: ' + err.message);
      },
    });
  }

  compProduct(a: Product, b: Product): boolean {
      return a && b && a.id == b.id;
    }

    compRequest(a: Request, b: Request): boolean {
      return a && b && a.id == b.id;
    }

    compVendor(a: Vendor, b:Vendor): boolean {
      return a && b && a.id == b.id;
    }

}
