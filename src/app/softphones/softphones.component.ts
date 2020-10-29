import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { SerivceService } from 'src/app/shared/serivce.service';
import { registerLocaleData } from '@angular/common';
import localeTH from '@angular/common/locales/th';
import { Router } from '@angular/router';

@Component({
  selector: 'app-softphones',
  templateUrl: './softphones.component.html',
  styleUrls: ['./softphones.component.css']
})
export class SoftphonesComponent implements OnInit {

  formSearch: FormGroup;
  softphones: [];

  constructor(
    private fb: FormBuilder,
    private service: SerivceService,
    private router: Router
  ) {
    registerLocaleData(localeTH);
  }

  ngOnInit(): void {
    this.initForm();
    this.getSoftphones();
  }

  initForm() {
    this.formSearch = this.fb.group({
      search: [' ']
    });
  }

  getSoftphones() {
    this.service.softphones(this.formSearch.value).subscribe(response => {
      this.softphones = response.result;
    })
  }

  onSubmit() {
    if (this.formSearch.valid) {
      this.service.softphones(this.formSearch.value).subscribe(response => {
        this.softphones = response.result;
      })
    }

  }

}
