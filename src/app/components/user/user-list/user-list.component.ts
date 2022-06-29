import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {AddUserFormComponent, AddUserFormResponse} from "../add-user-form/add-user-form.component";
import {BsModalService} from "ngx-bootstrap/modal";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {v4 as uuidv4} from 'uuid';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  page: number;
  itemsPerPage: number;

  @Input() users: User[];

  @Input()
  usersForFiltering: User[];

  @Output() onExport: EventEmitter<Array<User>> = new EventEmitter<Array<User>>()

  @Output() onUserRemove: EventEmitter<string> = new EventEmitter<string>();

  @Output() onUserAdd: EventEmitter<User> = new EventEmitter<User>();

  @Output() onUserUpdate: EventEmitter<User> = new EventEmitter<User>();

  constructor(private router: Router, private modalService: BsModalService) {
    this.users = [];
    this.page = 1;
    this.itemsPerPage = 3;
  }

  ngOnInit(): void {
  }

  // emits an event<userId> to the parent provided by the user-card component
  removeUser(id: string): void {
    this.onUserRemove.emit(id);
  }

  // emits user onUpdate
  updateUser(user: User): void {
    this.onUserUpdate.emit(user);
  }

  // emits an export event<Array<UserModel>> of the curr user-list
  exportData(): void {
    this.onExport.emit(this.users);
  }

  // navigates to /exports route
  goToExportsPage(): void {
    this.router.navigate(['/exports'])
  }

  // opens a modal with add user form
  openAddUserFormModal() {
    const initialState = {
      title: 'Add a new user',
      closeBtnName: 'Close',
      btnText: 'Add user',
      initialInputs: {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        age: new FormControl('', [Validators.required, Validators.max(110)]),
      }
    }
    let modalRef = this.modalService.show(AddUserFormComponent, {class: 'modal-md', initialState});
    modalRef.content!.onSubmit.subscribe((userRes: AddUserFormResponse) => {
      const newUser: User = {
        id: uuidv4(),
        timestamp: new Date(),
        ...userRes
      }
      this.emitAddedUser(newUser);
      modalRef.hide();
    });
  }

  // opens modal with user details
  openUserDetailsModal(userIdx: number): void {
    const initialState = {
      user: this.users[userIdx],
      title: 'User details',
      closeBtnName: 'Close',
    };
    let modalRef = this.modalService.show(UserDetailsComponent, {class: 'modal-lg', initialState});

    // subs to onUserDelete event
    modalRef.content!.onUserDelete.subscribe((id: string) => {
      this.removeUser(id);
      modalRef.hide();
    })

    // subs to onUserUpdate event
    modalRef.content!.onUserUpdate.subscribe((user: User) => {
      this.updateUser(user);
    })

  }

  // emits user from this component to parent
  emitAddedUser(user: User): void {
    this.onUserAdd.emit(user);
  }

  // applies filter to users array
  applyFilter(filter: string): void {
    let filterValueLower: string = filter.toLowerCase();
    if (filter === "") {
      this.usersForFiltering = this.users;
    } else {
      this.usersForFiltering = this.users.filter((user) =>
        user.firstName.toLowerCase().includes(filterValueLower) ||
        user.lastName.toLowerCase().includes(filterValueLower) ||
        user.email!.includes(filterValueLower)
      );
    }
  }
}
