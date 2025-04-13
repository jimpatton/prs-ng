import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
title:string = "Product List";
products!:Product[];
subscription!:Subscription;
welcomeMsg!:string;
loggedInUser!:User;
isAdmin:boolean = false;

constructor(
  private productSvc:ProductService,
  private sysSvc:SystemService

){}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.subscription = this.productSvc.list().subscribe(
      (resp) => {
        this.products = resp;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete(id:number){
    this.subscription = this.productSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.productSvc.list().subscribe((resp) => {
        this.products = resp;  
      });   
    },
    error: (err) =>{
      console.log('Error deleting product: ' +id);
      alert('Error deleting product for id: '+id);
    }
  });
  }
}