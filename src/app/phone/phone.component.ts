import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken() === null) {
      this.router.navigate(['phone/login']);
    }
  }

}
