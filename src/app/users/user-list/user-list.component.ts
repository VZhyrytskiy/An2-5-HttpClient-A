import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/switchMap';

import { User } from './../../models/user';
import { UserArrayService, UserObservableService } from './../';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: Array<User>;
  errorMessage: string;

  private subscription: Subscription[] = [];
  private editedUser: User;

  constructor(
    private userArrayService: UserArrayService,
    private userObservableService: UserObservableService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const sub = this.userObservableService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error
      );
    this.subscription.push(sub);

    // listen id from UserFormComponent
    this.route.params
      .switchMap((params: Params) => this.userArrayService.getUser(+params['id']))
      .subscribe(
        (user: User) => {
          this.editedUser = Object.assign({}, user);
          console.log(`Last time you edit user ${JSON.stringify(this.editedUser)}`);
        },
        (err) => console.log(err)
      );

  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  deleteUser(user: User) {
    this.userObservableService.deleteUser(user)
    .subscribe(
             () => this.users = this.users.filter(u => u !== user),
             err => console.log(err)
       );
  }

}
