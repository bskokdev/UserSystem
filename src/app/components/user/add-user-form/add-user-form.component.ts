import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";

export type AddUserFormResponse = {
  firstName: string,
  lastName: string,
  age: number,
  email?: string
}

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

  title: string;
  addUserForm: FormGroup;
  closeBtnName: string;
  btnText: string;

  initialInputs: Object;

  @Output() onSubmit: EventEmitter<AddUserFormResponse> = new EventEmitter<AddUserFormResponse>();

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) {
    // initial form inputs
    this.initialInputs = {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      age: new FormControl(''),
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  // function to initialize the add-user-form
  initializeForm(): void {
    this.addUserForm = this.fb.group(this.initialInputs);
  }

  // creates a user object from form values
  // emits the created object as an event<user>
  handleSubmit(): void {
    let res: AddUserFormResponse = this.addUserForm.value;
    this.onSubmit.emit(res); // sends data from the form to parent
    this.addUserForm.reset(); // resets the form
  }
}
