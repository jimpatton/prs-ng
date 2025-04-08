import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-request-create',
  standalone: false,
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent implements OnInit, OnDestroy{
  title:string = "Request Create";
  newRequest:Request = new Request();
  subscription!:Subscription;
  users!: User[];
  deliveryModes: string[] = ['Pickup', 'Delivery'];
  statuss: string[] = ['Approved', 'New', 'Rejected', 'Review'];
 
  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router
  ){}

    ngOnInit(): void {
    this.subscription = this.userSvc.list().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) => {
        console.error(
          'Product Create Error: error loading users.' + err.message
        );
      },
    });
  }

  addRequest() {
    console.log('a', this.newRequest);
    this.subscription = this.requestSvc.add(this.newRequest).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error('Error creating request: ' + err.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  } 

}