import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: LoginUser = new LoginUser();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  doLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.signIn(this.user).subscribe(
      (res) => {
        console.log(res);
        this.authService.setToken(res);
        this.router.navigate(['/home']);
      },
      (error) => console.log('oops', error)
    )
  }

}
