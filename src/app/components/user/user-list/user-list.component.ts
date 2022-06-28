import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {AddUserFormComponent} from "../add-user-form/add-user-form.component";
import {BsModalService} from "ngx-bootstrap/modal";

// import * as _ from 'lodash';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  page: number;
  itemsPerPage: number;
  // destroy$: Subject<any>;

  @Input() users: User[];

  @Output() onExport: EventEmitter<Array<User>> = new EventEmitter<Array<User>>()

  @Output() onUserRemove: EventEmitter<string> = new EventEmitter<string>();

  @Output() onUserAdd: EventEmitter<User> = new EventEmitter<User>();

  constructor(private router: Router, private modalService: BsModalService) {
    this.users = [];
    this.page = 1;
    this.itemsPerPage = 3;
  }

  ngOnDestroy(): void {
    // this.destroy$.complete();
    // this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
  }

  // emits an event<userId> to the parent provided by the user-card component
  removeUser(id: string): void {
    this.onUserRemove.emit(id);
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
      closeBtnName: 'Close'
    }
    let modalRef = this.modalService.show(AddUserFormComponent, {class: 'modal-md', initialState});
    modalRef.content!.onAddUser.subscribe((user: User) => {
      this.emitAddedUser(user);
      modalRef.hide();
      console.log(user);
    });
  }

  // emits user from this component to parent
  emitAddedUser(user: User): void {
    this.onUserAdd.emit(user);
  }

}
