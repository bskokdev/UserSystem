import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {v4 as uuidv4} from 'uuid';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

  title: string;
  addUserForm: FormGroup;
  closeBtnName: string;

  @Output() onAddUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  // function to initialize the add-user-form
  initializeForm(): void {
    this.addUserForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required]),
    });
  }

  // creates a user object from form values
  // emits the created object as an event<user>
  addUser(): void {
    let user: User = {
      id: uuidv4(),
      timestamp: new Date(),
      ...this.addUserForm.value
    }
    this.onAddUser.emit(user); // sends data from the form to parent
    this.addUserForm.reset(); // resets the form
  }
}
