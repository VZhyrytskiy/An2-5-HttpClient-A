import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from './../models/user';

import { UserObservableService } from './../users';

@Injectable()
export class UserResolveGuard implements Resolve<User> {

  constructor(
    // private userArrayService: UserArrayService,
    private userObservableService: UserObservableService,
    private router: Router
  ) {}

  // resolve(route: ActivatedRouteSnapshot): Promise<User> {
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = +route.params['id'];

    // return this.userArrayService.getUser(id).then(user => {
    //   if (user) {
    //     return user;
    //   }
    //   else { // id not found
    //     this.router.navigate(['/users']);
    //     return null;
    //   }
    // });

    return this.userObservableService.getUser(id)
      .catch(() => {
        this.router.navigate(['/users']);
        return Observable.of(null);
      });


  }
}
