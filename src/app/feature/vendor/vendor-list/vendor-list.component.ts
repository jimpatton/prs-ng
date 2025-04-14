import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  standalone: false,
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListComponent implements OnInit, OnDestroy {
title:string = "Vendor List";
vendors!:Vendor[];
subscription!:Subscription;
welcomeMsg!:string;
loggedInUser!:User;
isAdmin:boolean = false;

constructor (
  private vendorSvc: VendorService,
  private sysSvc: SystemService,
  private router:Router
) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    // if(!this.isAdmin){
    //   this.router.navigateByUrl('/not-authorized')
    //   return;
    // }
    this.subscription = this.vendorSvc.list().subscribe(
      (resp) => {
        this.vendors = resp;
      }
    );
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

delete(id:number) {
    this.subscription = this.vendorSvc.delete(id).subscribe({
      next:() => {
        this.subscription = this.vendorSvc.list().subscribe((resp) =>{
          this.vendors = resp;
        })
      },
      error: (err) => {
        console.log('Error deleting vendor for id: '+id);
        alert('Error deleting vendor for id: '+id);
      }
    });
  }
}