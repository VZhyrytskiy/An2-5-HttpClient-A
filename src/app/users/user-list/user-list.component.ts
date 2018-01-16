import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';
import { catchError, switchMap } from 'rxjs/operators';

import { User } from './../models/user.model';
import { UserArrayService, UserObservableService } from './../services';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<Array<User>>;

  private editedUser: User;

  constructor(
    private userArrayService: UserArrayService,
    private userObservableService: UserObservableService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.users$ = this.userObservableService.getUsers();

    // listen editedUserID from UserFormComponent
    this.route.paramMap
      .pipe(
        switchMap((params: Params) => this.userArrayService.getUser(+params.get('editedUserID')))
      )
      .subscribe(
        (user: User) => {
          this.editedUser = {...user};
          console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
        },
        err => console.log(err)
      );
  }

  editUser(user: User) {
    const link = ['/users/edit', user.id];
    this.router.navigate(link);
  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  deleteUser(user: User) {
    this.users$ = this.userObservableService.deleteUser(user);
  }

}
