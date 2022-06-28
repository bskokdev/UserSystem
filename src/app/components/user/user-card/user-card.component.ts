import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {BsModalService} from "ngx-bootstrap/modal";
import {UserDetailsComponent} from "../user-details/user-details.component";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  // props coming from parent
  @Input() user: User | undefined;
  // creating custom event for user deletion
  @Output() onUserDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  // emits an event with user id
  deleteUser(id: string) {
    this.onUserDelete.emit(id);
  }

  // opens modal with user details
  openUserDetailsModal(): void {
    const initialState = {
      user: this.user,
      title: 'User details',
      closeBtnName: 'Close'
    };
    let modalRef = this.modalService.show(UserDetailsComponent, {class: 'modal-lg', initialState});
    //todo: add modalRef.content.subscribe to onRemove event
    modalRef.content!.onUserDelete.subscribe((id: string) => {
      this.deleteUser(id);
      modalRef.hide();
    })
  }

  // redirects to the /users/{id} route
  onSelect(user: User) {
    this.router.navigate(['/users', user.id]);
  }
}
