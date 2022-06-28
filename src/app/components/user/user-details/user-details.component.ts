import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../../models/user";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AddUserFormComponent} from "../add-user-form/add-user-form.component";

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

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  //todo: remove emit
  emitDeletedUserId(id: string): void {
    this.onUserDelete.emit(id);
  }

  // opens a modal with add user form
  openAddUserFormModal() {
    // hides the user details modal
    this.bsModalRef.hide();
    const initialState = {
      //todo: add saved user values
      title: 'Add a new user',
      closeBtnName: 'Close'
    }

    // todo: replace addUserFormComponent with updateUserForm (same id && timestamp, other values editable)
    let modalRef = this.modalService.show(AddUserFormComponent, {class: 'modal-md', initialState});
    // todo: add PUT req in the user service
    // modalRef.content!.onAddUser.subscribe((user: User) => {
    //   this.emitAddedUser(user);
    //   modalRef.hide();
    //   console.log(user);
    // });
  }

}
