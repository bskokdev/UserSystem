import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlContainer, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomInputComponent,
      multi: true
    }
  ],
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {

  control: AbstractControl;

  // form group the input belongs to
  @Input()
  formGroup: FormGroup;

  @Input()
  controlName: string;

  @Input()
  label: string;

  @Input()
  placeholder: string;

  @Input()
  type: string;

  @Input()
  errorMessage: string;

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    // creates a new control from controlContainer and controlName
    if (this.controlContainer && this.controlName) {
      this.control = this.controlContainer.control!.get(this.controlName)!;
    }
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }

}
