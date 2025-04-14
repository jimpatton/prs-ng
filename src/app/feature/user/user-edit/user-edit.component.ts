import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit, OnDestroy{
title:string = "User Edit";
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
  private sysSvc:SystemService,
){}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.actRoute.params.subscribe((parms) =>{
      this.userId = parms['id'];
      this.subscription = this.userSvc.getById(this.userId).subscribe({
        next:(resp) => {
          this.user = resp;
        },
        error:(err) => {
          console.log('Error retrieving user: ', err);
        }
    });
  });
}

save() {
  this.userSvc.update(this.user).subscribe({
    next: (resp) => {
      this.user = resp;
      this.router.navigateByUrl('/user-list');
    },
    error: (err) => {
      console.log('Error saving user: ', err);
    }
  })
}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
