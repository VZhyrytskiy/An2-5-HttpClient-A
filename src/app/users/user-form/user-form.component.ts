import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from './../../models/user';
import { DialogService } from './../../services/dialog.service';
import { UserArrayService } from './../services/user-array.service';

import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  user: User;
  originalUser: User;

  constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.user = new User(null, '', '');

    this.route.data.forEach((data: { user: User }) => {
      this.user = Object.assign({}, data.user);
      this.originalUser = Object.assign({}, data.user);
    });
  }

  ngOnDestroy(): void {
  }

  saveUser() {
    const user = new User(
      this.user.id,
      this.user.firstName,
      this.user.lastName
    );

    if (user.id) {
      this.userArrayService.updateUser(user);
      // if success
      this.originalUser = Object.assign({}, this.user);
      // optional parameter: http://localhost:4200/users;id=2
      this.router.navigate(['users', { id: user.id }]);
    }
    else {
      this.userArrayService.addUser(user);
      // if success
      this.originalUser = Object.assign({}, this.user);
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> |Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`)
    if (!this.originalUser || this.originalUser.firstName === this.user.firstName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
