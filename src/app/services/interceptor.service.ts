import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHandler, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Request Interceptor:`);

    // request interceptor
    req = req.clone({
      params: new HttpParams()
        .set('interceptor', 'yes')
    });
    console.log(req);

    return next.handle(req)
      // response interceptor
      .map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response
          console.log('Response Interceptor');
          console.log(event);
          event.body[0].action = 'Estimate11111';
          return event;
        }
      });
  }
}
