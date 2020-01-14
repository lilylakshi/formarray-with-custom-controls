import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comic-book',
  templateUrl: './comic-book.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComicBookComponent),
      multi: true,
    }
  ]
})
export class ComicBookComponent implements OnDestroy, ControlValueAccessor {

  private propagateChange = (_: any) => { };
  private formValueSubscription: Subscription;

  formGroup: FormGroup = this.fb.group({
    name: [''],
    heroes: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {
    this.formValueSubscription = this.formGroup.valueChanges.subscribe(value => {
      this.propagateChange(value);
    })
  }

  ngOnDestroy(): void {
    this.formValueSubscription.unsubscribe();
  }

  writeValue(value: any): void {
    this.formGroup.get('name').setValue(value.name);
    value.heroes.forEach(element => {
      (<FormArray>this.formGroup.get('heroes')).push(new FormControl(element));
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
}
