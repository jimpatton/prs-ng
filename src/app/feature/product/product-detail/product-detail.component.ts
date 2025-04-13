import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';


@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit, OnDestroy{
title:string = "Product Detail";
productId!:number;
product!:Product;
subscription!:Subscription;
welcomeMsg!:string;
loggedInUser!:User;
isAdmin:boolean = false;

constructor(
  private productSvc: ProductService,
  private router: Router,
  private actRoute: ActivatedRoute,
  private sysSvc:SystemService
 ) {}

  ngOnInit(): void {
   
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.actRoute.params.subscribe((parms) => {
      this.productId = parms['id'];
      console.log("this.productId", this.productId)
      this.subscription = this.productSvc.getById(this.productId).subscribe({
        next:(resp) => {
          this.product = resp;          
        },
        error:(err) => {
          console.log('Error retrieving product: ',err);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
   delete() {
    this.productSvc.delete(this.productId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/product-list');
      },
      error: err =>{
        console.log(err);
      }
      });   
   }  
}  