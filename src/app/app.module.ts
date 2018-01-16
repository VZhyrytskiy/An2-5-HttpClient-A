import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';

import { CoreModule } from './core/core.module';
import { TasksModule } from './tasks/tasks.module';
import { SharedModule } from './shared/shared.module';

// add this line if you don't have access to
// index.html and you want to set base tag
// import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule, appRouterComponents } from './app.routing.module';
import { AppComponent } from './app.component';
import { MyInterceptor } from './core/interceptors/my.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    appRouterComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TasksModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    // add this line if you don't have access to
    // index.html and you want to set base tag
    // { provide: APP_BASE_HREF, useValue: '/' }
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
