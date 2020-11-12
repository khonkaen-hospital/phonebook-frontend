import { Component, OnInit, Pipe, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormsModule } from '@angular/forms';
import { SerivceService } from 'src/app/shared/serivce.service';
import { registerLocaleData } from '@angular/common';
import localeTH from '@angular/common/locales/th';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../shared/token-storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  keyTimeOut: any;
  search: '';
  personInfo = '';
  message = '';
  constructor(private fb: FormBuilder,
    private service: SerivceService,
    private router: Router,
    private tokenStorageService: TokenStorageService) {
    registerLocaleData(localeTH);
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken() === null) {
      this.router.navigate(['phone/login']);
    }
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      no: ['', [Validators.min(4)]],
      department: ['', Validators.required],
      area: ['', Validators.required],
      responder: ['', Validators.required],
      qr_3cx: ['', Validators.required],
      uid: ['', Validators.required],
    });
  }

  onSubmit() {
    this.message = '';
    if (this.form.invalid) {
      this.message = 'ระบุข้อมูล ไม่ครบ';
    } else {
      this.service.addPhone(this.form.value).subscribe(response => {
        if (response.result[0] == 0) {
          this.form.reset();
          this.message = 'เพิ่มข้อมูลเรียบร้อยแล้ว';
          this.personInfo = '';
        } else {
          this.message = `"code": ${response.result.code}, "sqlMessage": ${response.result.sqlMessage}`;
        }
      });
    }
  }

  onSearchPerson(value: any) {
    if (this.keyTimeOut) {
      clearTimeout(this.keyTimeOut)
    }
    if (value.length > 2) {
      this.keyTimeOut = setTimeout(() => {
        this.service.getPerson(value).subscribe(response => {
          if (response.result[0] !== undefined) {
            let row = response.result[0];
            this.personInfo = row.code + ' ' + row.name + ' ' + row.surname;
            this.form.get('department').patchValue(row.department);
            this.form.get('area').patchValue(row.name + ' ' + row.surname);
            this.form.get('responder').patchValue(row.code);
            this.form.get('uid').patchValue(row.code);
          } else {
            this.personInfo = 'ไม่พบข้อมูล';
          }
        });
      }, 1000);
    } else {
      this.personInfo = '';
      this.message = '';
    }
  }

  numberCheck(e: any) {
    if (e.which !== 8 && e.which !== 0 && e.which !== 46 && (e.which < 48 || e.which > 57) && e.which !== 190) {
      e.preventDefault()
    }
  }

}
