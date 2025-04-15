import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { User } from '../../model/user';
import { SystemService } from '../../service/system.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  title = 'PRS';
  menuItems: MenuItem[] = [];
  welcomeMsg!:string;
  loggedInUser!:User;
  isAdmin:boolean = false;

  constructor(
    private sysSvc:SystemService
  ){}

  ngOnInit(): void {
    this.menuItems = [
      new MenuItem('User','/user-list','User LIst'),
      new MenuItem('Vendor','/vendor-list','Vendor LIst'),
      new MenuItem('Product','/product-list','Product LIst'),
      new MenuItem('Request','/request-list','Request LIst'),       
      new MenuItem('Review','/request-review','Request Review'),
      new MenuItem('Login', '/user-login','User Login')     
    ];
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
  }

}