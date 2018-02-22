import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AboutComponent,
  LoginComponent,
  MessagesComponent,
  PathNotFoundComponent,
  AuthGuard,
  AuthService,
  CanDeactivateGuard,
  DialogService,
  MessagesService,
  CustomPreloadingStrategyService,
  SpinnerService
} from '.';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AboutComponent,
    PathNotFoundComponent,
    MessagesComponent,
    LoginComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    CustomPreloadingStrategyService,
    CanDeactivateGuard,
    DialogService,
    MessagesService,
    SpinnerService
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        `CoreModule is already loaded. Import it in the AppModule only.`
      );
    }
  }
}
