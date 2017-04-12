import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule, usersRouterComponents } from './users.routing.module';

import { UserComponent, UserArrayService, UserObservableService } from '.';
import { CanDeactivateGuard } from './../guards/can-deactivate.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule
  ],
  declarations: [
    usersRouterComponents,
    UserComponent,
  ],
  providers: [
    UserArrayService,
    UserObservableService,
    CanDeactivateGuard
  ]
})
export class UsersModule {}
