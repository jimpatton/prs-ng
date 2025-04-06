import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  title = 'PRS';
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      new MenuItem('User','/user-list','User LIst'),
      new MenuItem('Vendor','/vendor-list','Vendor LIst'),
      new MenuItem('Product','/product-list','Product LIst'),
      new MenuItem('Request','/request-list','Request LIst'),      
    ];
  }

}