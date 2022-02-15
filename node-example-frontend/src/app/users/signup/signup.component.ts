import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UUID } from 'angular2-uuid';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  doSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.user.userId = UUID.UUID().toString();
    this.authService.signUp(this.user).subscribe(
      (res) => {
        console.log('Sucessfull signup');
        form.reset();
        this.moveToLogin();
      },
      (error) => console.log('oops', error)
    )
  }

  moveToLogin() {
    this.router.navigate(['login']);
  }

}
