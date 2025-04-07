import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit, OnDestroy{
title:string = "Product Edit"
productId!:number;
product!:Product;
subscription!:Subscription;
vendors: Vendor[] = [];

constructor(
private productSvc:ProductService,
private vendorSvc:VendorService,
private router:Router,
private actRoute: ActivatedRoute,
){}

  ngOnInit(): void {
    console.log("pe ngoninit()");
    this.actRoute.params.subscribe((parms) =>{
      console.log("A");
      this.productId = parms['id'];
      this.subscription = this.productSvc.getById(this.productId).subscribe({
        next: (resp) => {
          this.product = resp;
          console.log("Pe product", this.product);
        },
        error:(err) => {
          console.error('Error getting product for id: '+ this.productId);
        }
      });
    });
    this.subscription = this.vendorSvc.list().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error:(err) =>{
        console.error('Product Create Error: error loading vendor.' +err.message);        
      },
    });
  }

save(){
  this.subscription = this.productSvc.update(this.product).subscribe({
    next:(resp) => {
      this.router.navigateByUrl('/product-list');
    },
    error:(err) => {
      console.error('Error editing product: '+err.message);
    },
  });
}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();  
  }

  compVendor(a: Vendor, b: Vendor): boolean{
    return a && b && a.id == b.id;
  }

}
