import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../shared/token-storage.service';

@Component({
  selector: 'app-metting',
  templateUrl: './metting.component.html',
  styleUrls: ['./metting.component.css']
})
export class MettingComponent implements OnInit {

  isLoggedIn = false;
  username: string;

  constructor(
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.fullName;
    }
  }

  logout(): void {
    this.tokenStorageService.logOut();
    window.location.reload();
  }
}
