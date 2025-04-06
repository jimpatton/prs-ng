import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from '../../../model/vendor';

@Component({
  selector: 'app-vendor-edit',
  standalone: false,
  templateUrl: './vendor-edit.component.html',
  styleUrl: './vendor-edit.component.css'
})
export class VendorEditComponent implements OnInit, OnDestroy{
  title:string = 'Vendor Edit';
  vendorId!:number;
  vendor!:Vendor;
  subscription!:Subscription;
  states:string[] = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", 
    "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", 
    "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", 
    "WI", "WY"]

    constructor(
      private vendorSvc:VendorService,
      private router:Router,
      private actRoute: ActivatedRoute,
    ){}

  ngOnInit(): void {
    this.actRoute.params.subscribe((parms) => {
      this.vendorId = parms['id'];
        this.subscription = this.vendorSvc.getById(this.vendorId).subscribe({
          next:(resp) => {
            this.vendor = resp;
          },
          error:(err) => {
            console.log('Error retrieving vendor: ',err);            
          }
        });      
    });
  }

 save() {
    this.vendorSvc.update(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        this.router.navigateByUrl('/vendor-list');
      },
      error: (err) => {
        console.log('Error saving vendor: ', err);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}