import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './../../models/user';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  editUser() {
    const link = ['/users/edit', this.user.id];
    this.router.navigate(link);

    // or
    // const link = ['edit', this.user.id];
    // this.router.navigate(link, {relativeTo: this.route});
  }
}
