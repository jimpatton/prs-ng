import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  title: string = 'Product Create';
  newProduct: Product = new Product();
  subscription!: Subscription;
  vendors!: Vendor[];

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.vendorSvc.list().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        console.error(
          'Product Create Error: error loading vendors.' + err.message
        );
      },
    });
  }

  addProduct() {
    console.log('a', this.newProduct);
    this.subscription = this.productSvc.add(this.newProduct).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/product-list');
      },
      error: (err) => {
        console.error('Error creating product: ' + err.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
