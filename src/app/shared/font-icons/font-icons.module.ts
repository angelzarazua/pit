import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faCoffee, faPen } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class FontIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCoffee);
    library.addIcons(faPen);
    library.addIcons(faCheck);    
  }
}
