import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-detail',
  standalone: false,
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css'
})
export class RequestDetailComponent implements OnInit, OnDestroy{
  title:string = "Request Detail";
  requestId!:number;
  request!:Request;
  subscription!:Subscription;

  constructor(
    private requestSvc:RequestService,
    private router:Router,
    private actRoute:ActivatedRoute
  ){}




  ngOnInit(): void {
    this.actRoute.params.subscribe((parms) => {
      this.requestId = parms['id'];
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next:(resp) => {
          this.request = resp;
        },
        error:(err) => {
          console.log('Error retrieving request: ',err);
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete() {
    this.requestSvc.delete(this.requestId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: err =>{
        console.log(err);
      }
      });   
   }  




}
