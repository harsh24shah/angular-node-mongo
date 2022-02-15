import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../components/error/error.component';
import { EmailValidator } from '../directives/emailvalidator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ErrorComponent,
    EmailValidator
  ],
  exports: [
    ErrorComponent,
    EmailValidator
  ],
  providers: []
})
export class SharedModule { }
