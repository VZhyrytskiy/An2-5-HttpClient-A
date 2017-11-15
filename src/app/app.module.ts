import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { TasksModule } from './tasks/tasks.module';

// add this line if you don't have access to
// index.html and you want to set base tag
// import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule, appRouterComponents } from './app.routing.module';
import { AppComponent } from './app.component';
import { MessagesService } from './services';
import { MessagesComponent } from './components';

import { DialogService } from './services/dialog.service';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    appRouterComponents,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TasksModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DialogService,

    // add this line if you don't have access to
    // index.html and you want to set base tag
    // { provide: APP_BASE_HREF, useValue: '/' }
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
