import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../shared/token-storage.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

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
