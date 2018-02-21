import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { User } from './../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user: User;

  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();

  onEditUser() {
    this.editUser.emit(this.user);
  }

  onDeleteUser() {
    this.deleteUser.emit(this.user);
  }
}
