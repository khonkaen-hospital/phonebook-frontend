import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { SerivceService } from 'src/app/shared/serivce.service';
import { registerLocaleData } from '@angular/common';
import localeTH from '@angular/common/locales/th';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: string = '';
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(
    private fb: FormBuilder,
    private service: SerivceService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    registerLocaleData(localeTH);
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      hour: 12,
      module: ""
    });
  }

  async onLogin() {
    this.message = '';
    if (this.form.valid) {
      this.service.login(this.form.value).subscribe(response => {
        if (response.ok) {
          this.tokenStorage.saveToken(response.token);
          this.service.decodeToken(response.token).then(response => { this.tokenStorage.saveUser(response); });
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        } else {
          this.message = 'กรุณาตรวจสอบ Username Password';
          this.form.get('username').patchValue('');
          this.form.get('password').patchValue('');
        }
      }, err => {
        this.message = err;
        this.isLoginFailed = true;
      });
    }
  }

  reloadPage(): void {
    window.location.href = '/phone/create';
  }

}
