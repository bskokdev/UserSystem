import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  @Input()
  form: FormGroup;

  @Input()
  controlName: string;

  @Input()
  label: string;

  @Input()
  type: string;

  @Input()
  placeholder: string;

  @Input()
  errorMessage: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
