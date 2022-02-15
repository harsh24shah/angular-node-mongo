import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[emailvalidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true }]
})
export class EmailValidator implements Validator {

  validate(c: FormControl): ValidationErrors {
    const emailvalidator = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(c.value);
    const message = {
      'emailvalidator': {
        'message': 'Email id must be valid (test@test.com)'
      }
    };
    return emailvalidator ? null : message;
  }
}