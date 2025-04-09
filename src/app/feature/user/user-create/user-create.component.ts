import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit, OnDestroy{
  title: string = "User Create";
  newUser:User = new User();
  user!:User;
  subscription!:Subscription;
  welcomeMsg!:string;
  loggedInUser!:User;
  isAdmin:boolean = false;

constructor(
  private userSvc: UserService,
  private router: Router,
  private sysSvc:SystemService
) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.subscription.unsubscribe();
  }
  ngOnDestroy(): void { }

  addUser():void{
    this.subscription = this.userSvc.add(this.newUser).subscribe((resp) =>{
      this.router.navigateByUrl('/user-list');
    });
  }
}