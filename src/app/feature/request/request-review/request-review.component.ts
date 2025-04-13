import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Request } from '../../../model/request';
import { Subscription } from 'rxjs';
import { SystemService } from '../../../service/system.service';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { parseTemplate } from '@angular/compiler';

@Component({
  selector: 'app-request-review',
  standalone: false,
  templateUrl: './request-review.component.html',
  styleUrl: './request-review.component.css'
})
export class RequestReviewComponent implements OnInit, OnDestroy{
title:string = "Request Review";
requestId:number =0 ;
request!:Request;
userId:number = 0;
user!:User[];
subscription!:Subscription;
welcomeMsg!:string;
loggedInUser!:User;
isAdmin:boolean = false;
isReviewer:boolean = false;

constructor(
  private sysSvc:SystemService,
  private requestSvc:RequestService,
  private userSvc:UserService,
  private router:Router,
  private actRoute:ActivatedRoute
){}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isReviewer = this.loggedInUser.reviewer;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    //get requests in "review" status
  }

    
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
