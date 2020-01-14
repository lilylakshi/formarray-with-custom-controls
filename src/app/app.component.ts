import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  oldForm: FormGroup = this.fb.group({
    collectionName: 'classics 1',
    comicBook: this.fb.group({
        name: 'volume 1',
        heroes: this.fb.array([
          this.fb.group({
            name: 'Superman',
            wealth: 'Piss poor'
          }),
          this.fb.group({
            name: 'Batman',
            wealth: 'Crazy rich'
          })
        ])
      })
  });

  newForm: FormGroup = this.fb.group({
    collectionName: 'classics 1',
    comicBook: {
      name: 'volume 1',
      heroes: [
        {
          name: 'Superman',
          wealth: 'Piss poor'
        },
        {
          name: 'Batman',
          wealth: 'Crazy rich'
        }
      ]
    }
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    console.log(this.newForm);
  }
}
