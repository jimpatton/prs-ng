import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit, OnDestroy{
  title:string = 'User Detail';
  userId!:number;
  user!:User;
  subscription!:Subscription;
  welcomeMsg!:string;
  loggedInUser!:User;
  isAdmin:boolean = false;

  constructor(
    private userSvc:UserService,
    private router:Router,
    private actRoute:ActivatedRoute,
    private sysSvc:SystemService
  ){}
  
  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
   this.actRoute.params.subscribe((parms)=>{
    this.userId = parms['id'];
    this.subscription = this.userSvc.getById(this.userId).subscribe({
      next:(resp) =>{
        this.user = resp;
      },
      error:(err) => {
        console.log('Error retrieving user: ', err);
      }
    });
   });
   }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete() {
    this.userSvc.delete(this.userId).subscribe({
      next:(resp) => {
        this.router.navigateByUrl('/user-list');        
      },
      error:err =>{
        console.log(err);
      }
    });
  }
}
