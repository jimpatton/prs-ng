import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-edit',
  standalone: false,
  templateUrl: './request-edit.component.html',
  styleUrl: './request-edit.component.css',
})
export class RequestEditComponent implements OnInit, OnDestroy {
  title: string = 'Request Edit';
  requestId!: number;
  request!: Request;
  subscription!: Subscription;
  users!: User[];
  deliveryModes: string[] = ['Pickup', 'Delivery'];
  statuss: string[] = ['Approved', 'New', 'Rejected', 'Review'];

  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((parms) => {
      this.requestId = parms['id'];
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
        },
        error: (err) => {
          console.error('Error getting request for id: ' + this.requestId);
        },
      });
    });
    this.subscription = this.userSvc.list().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) => {
        console.error(
          'Request Create Error: error loading users.' + err.message
        );
      },
    });
  }

  save() {
    this.subscription = this.requestSvc.update(this.request).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error('Error editing request ' + err.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  compUser(a: User, b: User): boolean {
    return a && b && a.id == b.id;
  }
}
