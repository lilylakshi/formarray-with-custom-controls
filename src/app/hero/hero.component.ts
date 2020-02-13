import { Component, forwardRef, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HeroComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => HeroComponent),
      multi: true,
    }
  ]
})
export class HeroComponent implements OnDestroy, ControlValueAccessor, Validator {

  constructor(private fb: FormBuilder) {
    this.formValueSubscription = this.formGroup.valueChanges.subscribe(value => {
      this.propagateChange(value);
    });
  }
  private formValueSubscription: Subscription;

  formGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    wealth: ['', Validators.required]
  });

  private propagateChange = (_: any) => { };
  private onValidatonChange = (_: any) => { };

  ngOnDestroy(): void {
    this.formValueSubscription.unsubscribe();
  }

  writeValue(value: any): void {
    this.formGroup.setValue(value);
  }
  registerOnChange(fn: any): void {
    // registeres a callback that should be fired when Angular needs to be aware that form is changed
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    // registers a callback that should be fired when the form is touched/blurred
    // let's skip this for simplicity
  }
  setDisabledState?(isDisabled: boolean): void {
    // is called when our custom control should be enabled/disabled
  }

  validate(control: AbstractControl): ValidationErrors {
    const error = this.formGroup.valid ? null : {error: 'errors_present_on_hero'};
    console.log('hero validity check', error);
    return error;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatonChange = fn;
  }

}
