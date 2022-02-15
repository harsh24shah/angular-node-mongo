import { Component, Input, OnInit } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'minlength': (params: any) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params: any) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params: any) => 'The required pattern is: ' + params.requiredPattern,
    'years': (params: any) => params.message,
    'countryCity': (params: any) => params.message,
    'uniqueName': (params: any) => params.message,
    'telephoneNumbers': (params: any) => params.message,
    'telephoneNumber': (params: any) => params.message,
    'emailvalidator': () => 'Email id must be valid (test@test.com)'
  };
  @Input() control: AbstractControlDirective | AbstractControl;


  constructor() {
  }

  ngOnInit() {
  }

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ErrorComponent.errorMessages[type](params);
  }

}
