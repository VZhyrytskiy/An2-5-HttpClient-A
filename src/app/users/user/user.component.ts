import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from './../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: User;

  @Output() delete = new EventEmitter<User>();
  @Output() edit = new EventEmitter<User>();

  editUser() {
    this.edit.emit(this.user);
  }

  deleteUser() {
    this.delete.emit(this.user);
  }

}
