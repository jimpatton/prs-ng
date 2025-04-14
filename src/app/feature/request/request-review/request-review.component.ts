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
requests!:Request[];
userId:number = 0;
user!:User[];
subscription!:Subscription;
welcomeMsg!:string;
loggedInUser!:User;
isAdmin:boolean = false;
isReviewer:boolean = false;
isLoggedInUser:boolean = false;

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
    //if not reviewer
    if(!this.isReviewer){
      this.router.navigate(['not-authorized'])
      return;
    }  
    //get requests in review status
    this.subscription = this.requestSvc.list().subscribe((resp)=>{
      this.requests = resp.filter(request=>request.status==='REVIEW')
    })

    



  }




    
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
