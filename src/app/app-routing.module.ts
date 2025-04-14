import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';
import { RequestEditComponent } from './feature/request/request-edit/request-edit.component';
import { RequestDetailComponent } from './feature/request/request-detail/request-detail.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { RequestLinesComponent } from './feature/request/request-lines/request-lines.component';
import { LineItemCreateComponent } from './feature/line-item/line-item-create/line-item-create.component';
import { LineItemDetailComponent } from './feature/line-item/line-item-detail/line-item-detail.component';
import { LineItemEditComponent } from './feature/line-item/line-item-edit/line-item-edit.component';
import { LineItemListComponent } from './feature/line-item/line-item-list/line-item-list.component';
import { RequestReviewComponent } from './feature/request/request-review/request-review.component';
import { NotAuthorizedComponent } from './core/not-authorized/not-authorized.component';
import { RequestApproveComponent } from './feature/request/request-approve/request-approve.component';

const routes: Routes = [
  {path:'', redirectTo: '/user-login',pathMatch: 'full'},
  {path:'user-list', component:UserListComponent},
  {path:'user-create', component:UserCreateComponent},
  {path:'user-edit/:id',component:UserEditComponent},
  {path:'user-detail/:id', component:UserDetailComponent},
  {path:'vendor-list', component:VendorListComponent},
  {path:'vendor-create', component:VendorCreateComponent},
  {path:'vendor-edit/:id',component:VendorEditComponent},
  {path:'vendor-detail/:id', component:VendorDetailComponent},
  {path:'request-list', component:RequestListComponent},
  {path:'request-create', component:RequestCreateComponent},
  {path:'request-edit/:id',component:RequestEditComponent},
  {path:'request-detail/:id', component:RequestDetailComponent},
  {path:'request-lines/:id', component:RequestLinesComponent},
  {path:'request-review', component:RequestReviewComponent},
  {path:'request-approve/:id', component:RequestApproveComponent},
  {path:'product-list', component:ProductListComponent},
  {path:'product-create', component:ProductCreateComponent},
  {path:'product-edit/:id',component:ProductEditComponent},
  {path:'line-items-list', component:LineItemListComponent},
  {path:'line-items-create/:requestId', component:LineItemCreateComponent},
  {path:'line-items-edit/:id',component:LineItemEditComponent},
  {path:'line-items-detail/:id', component:LineItemDetailComponent},
  {path:'product-detail/:id', component:ProductDetailComponent},
  {path:'user-login', component:UserLoginComponent},
  {path:'not-authorized', component:NotAuthorizedComponent},
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
