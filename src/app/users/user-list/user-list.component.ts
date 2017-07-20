import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { User } from './../../models/user';
import { UserArrayService } from './../services/user-array.service';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: Array<User>;

  private editedUser: User;

  constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userArrayService.getUsers()
      .then(users => this.users = users)
      .catch((err) => console.log(err));

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
  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }
}
