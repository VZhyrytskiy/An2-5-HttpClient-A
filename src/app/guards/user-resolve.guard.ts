import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { User } from './../models/user';
import { UserArrayService } from './../users/services/user-array.service';

@Injectable()
export class UserResolveGuard implements Resolve<User> {

  constructor(
    private userArrayService: UserArrayService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<User> {
    const id = +route.params['id'];

    return this.userArrayService.getUser(id).then(user => {
      if (user) {
        return user;
      }
      else { // id not found
        this.router.navigate(['/users']);
        return null;
      }
    });
  }
}
