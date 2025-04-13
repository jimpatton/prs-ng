import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { LineItemService } from '../../../service/line-item.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';
import { Vendor } from '../../../model/vendor';

@Component({
  selector: 'app-line-item-detail',
  standalone: false,
  templateUrl: './line-item-detail.component.html',
  styleUrl: './line-item-detail.component.css'
})
export class LineItemDetailComponent implements OnInit, OnDestroy{
title:string = "Line Item Detail";
lineItemId!:number;
lineItem!:LineItem;
subscription!:Subscription;
vendor!:Vendor[];
welcomeMsg!:string;
loggedInUser!:User;
isAdmin:boolean = false;

constructor(
  private lineItemSvc:LineItemService,
  private sysSvc:SystemService,
  private router:Router,
  private actRoute:ActivatedRoute,
  private vendorSvc:VendorService
){}




  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.actRoute.params.subscribe((params) => {
      this.lineItemId = params['id'];      
      this.subscription = this.lineItemSvc.getById(this.lineItemId).subscribe({
        next:(resp) => {
          this.lineItem = resp;  
          
          this.vendorSvc.list().subscribe({
            next: (resp) => {
              this.vendor= resp;
            },
          })
          

        },
        error:(err) => {
          console.log('Error retrieving line item: ',err);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete() {
    this.lineItemSvc.delete(this.lineItemId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/line-items-list');
      },
      error: err =>{
        console.log(err);
      }
      });   
   }  

}
