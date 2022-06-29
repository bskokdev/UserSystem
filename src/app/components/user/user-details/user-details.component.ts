import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../../models/user";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AddUserFormComponent, AddUserFormResponse} from "../add-user-form/add-user-form.component";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  title: string;
  user: User;
  closeBtnName: string;

  @Output()
  onUserDelete: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onUserUpdate: EventEmitter<User> = new EventEmitter<User>();

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  // emits id of a deleted user
  emitDeletedUserId(id: string): void {
    this.onUserDelete.emit(id);
  }

  // emits updated user
  emitUpdatedUser(user: User): void {
    this.onUserUpdate.emit(user);
  }

  // opens a modal with add user form
  openUpdateUserFormModal() {
    // hides the user details modal
    this.bsModalRef.hide();
    // initial values passed to the AddUserFormComponent
    const initialState = {
      title: 'Edit the user',
      closeBtnName: 'Close',
      btnText: "Edit user",
      initialInputs: {
        firstName: new FormControl(this.user.firstName, [Validators.required]),
        lastName: new FormControl(this.user.lastName, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        age: new FormControl(this.user.age, [Validators.required, Validators.max(110)]),
      }
    }

    let modalRef = this.modalService.show(AddUserFormComponent, {class: 'modal-md', initialState});

    // subs on form submit event
    modalRef.content!.onSubmit.subscribe((res: AddUserFormResponse) => {
      // creates an updatedUser with same id & timestamp
      const updatedUser = {
        id: this.user.id,
        timestamp: this.user.timestamp,
        ...res
      }
      // emits updated user
      this.emitUpdatedUser(updatedUser);
      // hides update form modal
      modalRef.hide();
    });
  }

}
