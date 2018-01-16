import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule, usersRouterComponents } from './users.routing.module';

import { UserComponent, UserArrayService, UserObservableService, UserResolveGuard } from '.';
import { UsersAPIProvider } from './users.config';

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
    UsersAPIProvider,
    UserResolveGuard
  ]
})
export class UsersModule {}
