import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';


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

constructor(
  private productSvc: ProductService,
  private router: Router,
  private actRoute: ActivatedRoute,
 ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((parms) => {
      this.productId = parms['id'];
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