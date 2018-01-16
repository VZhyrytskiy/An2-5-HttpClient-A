import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesComponent } from './components';
import { AuthGuard } from './guards/auth.guard';
import { AuthService, MessagesService, CustomPreloadingStrategyService } from './services';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessagesComponent, LoginComponent],
  providers: [
    MessagesService,
    AuthGuard,
    AuthService,
    CustomPreloadingStrategyService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only.`);
    }
  }
 }
