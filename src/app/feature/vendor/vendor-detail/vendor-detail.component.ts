import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-vendor-detail',
  standalone: false,
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.css'
})
export class VendorDetailComponent implements OnInit, OnDestroy{
title:string = "Vendor Detail";
vendorId!:number;
vendor!:Vendor;
subscription!:Subscription;
 states:string[] = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", 
    "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", 
    "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", 
    "WI", "WY"];
    welcomeMsg!:string;
    loggedInUser!:User;
    isAdmin:boolean = false;

constructor(
  private vendorSvc:VendorService,
  private router:Router,
  private actRoute:ActivatedRoute,
  private sysSvc:SystemService
) {}

ngOnInit(): void {  
  this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.actRoute.params.subscribe((parms) => {
      this.vendorId = parms['id'];      
      this.subscription = this.vendorSvc.getById(this.vendorId).subscribe({
        next:(resp) => {
          this.vendor = resp;
        },
        error:(err) => {
          console.log('Error retrieving vendor ', err);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

delete() {
    this.vendorSvc.delete(this.vendorId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/vendor-list');
      },
      error: err => {
        console.log(err);
      }
});
  }
}