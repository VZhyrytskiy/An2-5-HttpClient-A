import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User } from './../../models/user';
import { DialogService } from './../../services/dialog.service';
import { UserObservableService } from './..';
import { AutoUnsubscribe } from './../../decorators';

import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: 'user-form.component.html',
  styleUrls: ['user-form.component.css'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit {
  user: User;
  oldUser: User;

  private sub: Subscription[] = [];

  constructor(
    private userObservableService: UserObservableService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.user = new User(null, '', '');

    this.route.data.forEach((data: { user: User }) => {
      this.user = Object.assign({}, data.user);
      this.oldUser = data.user;
    });
  }

  saveUser() {
    const user = new User(
      this.user.id,
      this.user.firstName,
      this.user.lastName
    );

    const method = user.id ? 'updateUser' : 'createUser';
    const sub = this.userObservableService[method](user)
      .subscribe(
        () => {
          this.oldUser = this.user;
          user.id
            // optional parameter: http://localhost:4200/users;id=2
            ? this.router.navigate(['users', { id: user.id }])
            : this.router.navigate(['users']);
        },
        error => console.log(error)
      );
    this.sub.push(sub);

  }

  goBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route });
  }

  canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`)
    if (!this.oldUser || this.oldUser.firstName === this.user.firstName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
