import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Export} from "../../../models/export.model";
import {v4 as uuidv4} from 'uuid';
import {ExportService} from "../../../services/export.service";
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  users: User[];

  exports: Export[];


  constructor(private userService: UserService, private exportService: ExportService) {
    this.users = [];
    this.exports = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  // loads in the data from userService
  // users list is sorted by the timestamp parameter (newer first)
  getUsers(): void {
    this.userService.getSortedUsersByDate().pipe(takeUntil(this.destroy$)).subscribe(data => this.users = data);
  }

  // adds a new user to users array and sends POST req through the API
  addUser(user: User): void {
    this.users = [
      user,
      ...this.users,
    ];
    this.userService.addUser(user).pipe(takeUntil(this.destroy$)).subscribe();
  }

  // removes the user and sends DELETE req through the API
  removeUser(id: string): void {
    this.users = this.users.filter(user => user.id != id);
    this.userService.removeUser(id).pipe(takeUntil(this.destroy$)).subscribe();
  }

  // updates the user
  updateUser(user: User): void {
    // finds the index of the user by id
    const userIndex: number = this.users.findIndex(obj => obj.id == user.id);
    // updates in-memory user list
    this.users = [
      ...this.users.slice(0, userIndex),
      user,
      ...this.users.slice(userIndex + 1)
    ];
    // sends http PUT method
    this.userService.updateUser(user).subscribe();
  }

  // adds the current list of users to the exported list
  exportUserList(users: Array<User>): void {
    const newExport: Export = {
      id: uuidv4(),
      timestamp: new Date(),
      users
    }
    // add new export to the arr of exports
    this.exports = [
      newExport,
      ...this.exports
    ]
    this.exportService.addExport(newExport).pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    // unsubscribe from the observables
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
