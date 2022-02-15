import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userEmail = '';

  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.authService.getUserProfile().subscribe(
      (res) => {
        this.userEmail = res.toString();
      }),
      (error) => console.log('oops', error)
  }

}
