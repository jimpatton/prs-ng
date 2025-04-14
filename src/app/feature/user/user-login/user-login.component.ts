import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit, OnDestroy{
title:string = 'User Login';
userLogin:UserLogin = new UserLogin();
subscription!:Subscription;
user!:User;
message:string ="";

constructor(
  private userSvc:UserService,
  private router:Router,
  private sysSvc:SystemService,
){}

  ngOnInit(): void {
     console.log('login component ngoninit()');
    // this.userLogin.username = 'patton';
    // this.userLogin.password = 'password';
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

login(){
  console.log('login component login()');
    // call the userService.login(this.userLogin)
    // expected results??
    // invalid info: invalid login - message displayed
    // correct info: success login - fwd to movie-list-component
    this.subscription = this.userSvc.login(this.userLogin).subscribe({
     next:(resp)=> {
        // what is happening here? how do we end up here inside of next? successful login
        this.sysSvc.loggedInUser = resp;
        console.log('userlogin', this.sysSvc.loggedInUser);    
        //nav to movie list
        this.router.navigateByUrl('/request-list');
      },
      error: (err) =>{
        //unsuccessful login
        this.message = 'Invalid login - bad username/pwd combo'
      }
    });
  }
}