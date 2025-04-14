import { Component, OnDestroy, OnInit, } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit, OnDestroy{
  title: string = "User List";
  users!:User[];
  subscription!:Subscription;
  welcomeMsg!:string;
  loggedInUser!:User;
  isAdmin:boolean = false;

constructor(
  private userSvc:UserService,
  private sysSvc:SystemService,
  private router:Router
){}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    // if(!this.isAdmin){
    //   this.router.navigate(['not-authorized'])
    //   return;
    // }

    this.subscription = this.userSvc.list().subscribe(
      (resp) => {
        this.users = resp;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id:number) {
    this.subscription = this.userSvc.delete(id).subscribe({
      next:() => {
        this.subscription = this.userSvc.list().subscribe((resp) =>{
          this.users = resp;
        })
      },
      error: (err) => {
        console.log('Error deleting user for id: '+id);
        alert('Error deleting user for id: '+id);
      }
    });
  }
}

  
