import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { UsersServicesModule } from './users-services.module';

import {
  UsersRoutingModule,
  usersRouterComponents
} from './users-routing.module';
import { UserComponent } from './components';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    UsersServicesModule
  ],
  declarations: [usersRouterComponents, UserComponent]
})
export class UsersModule {}
