import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-vendor-create',
  standalone: false,
  templateUrl: './vendor-create.component.html',
  styleUrl: './vendor-create.component.css'
})
export class VendorCreateComponent implements OnInit, OnDestroy{
  title:string = 'Vendor Create';
 newVendor: Vendor = new Vendor();
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
      private sysSvc:SystemService     
    ){}

    
  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    
  }

  addVendor(): void {
    this.subscription = this.vendorSvc.add(this.newVendor).subscribe((resp)=>{
      this.router.navigateByUrl('/vendor-list')
    });
  }
}
