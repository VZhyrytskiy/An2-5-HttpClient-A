import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from './../models/user';

import { UserObservableService } from './../users';

@Injectable()
export class UserResolveGuard implements Resolve<User> {

  constructor(
    private userObservableService: UserObservableService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = +route.paramMap.get('id');
    if (id) {
      return this.userObservableService.getUser(id)
        .catch(() => {
          this.router.navigate(['/users']);
          return Observable.of(null);
        });
    }
    else {
      return Observable.of(new User(null, '', ''));
    }
  }
}
