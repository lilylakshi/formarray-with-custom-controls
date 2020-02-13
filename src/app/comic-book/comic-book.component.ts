import { Component, forwardRef, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comic-book',
  templateUrl: './comic-book.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComicBookComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ComicBookComponent),
      multi: true,
    }
  ]
})
export class ComicBookComponent implements OnDestroy, ControlValueAccessor, Validator {

  constructor(private fb: FormBuilder) {
    this.formValueSubscription = this.formGroup.valueChanges.subscribe(value => {
      this.propagateChange(value);
    });
  }
  private formValueSubscription: Subscription;

  formGroup: FormGroup = this.fb.group({
    name: [''],
    heroes: this.fb.array([])
  });

  private propagateChange = (_: any) => { };
  private onValidatonChange = () => { };

  ngOnDestroy(): void {
    this.formValueSubscription.unsubscribe();
  }

  writeValue(value: any): void {
    this.formGroup.get('name').setValue(value.name);
    value.heroes.forEach(element => {
      (this.formGroup.get('heroes') as FormArray).push(new FormControl(element));
    });
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
    console.log('book validity check');
    const heroesArray = this.formGroup.get('heroes') as FormArray;
    for (const heroControl of heroesArray.controls) {
      if (!heroControl.valid) {
        console.log('got hero errors');
        return {error: 'errors_present_on_comic_book'};
      }
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatonChange = fn;
  }

  onAddHero() {
    const heroesArray = this.formGroup.get('heroes') as FormArray;
    heroesArray.push(new FormControl({
      name: '',
      wealth: ''
    }));
    console.log('hero added');
  }
}
