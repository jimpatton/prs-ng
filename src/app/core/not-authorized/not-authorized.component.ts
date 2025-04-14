import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Subscription } from 'rxjs';
import { SystemService } from '../../service/system.service';

@Component({
  selector: 'app-not-authorized',
  standalone: false,
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.css'
})
export class NotAuthorizedComponent  implements OnInit, OnDestroy{
  title:string = "Unauthorized"
  welcomeMsg!:string;
  loggedInUser!:User;
  isAdmin:boolean = false;
  subscription!:Subscription;

  constructor(
    
  ){}
  
  ngOnInit(): void {
   
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

