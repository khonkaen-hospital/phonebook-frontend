import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { SerivceService } from 'src/app/shared/serivce.service';
import { registerLocaleData } from '@angular/common';
import localeTH from '@angular/common/locales/th';
import { Router } from '@angular/router';

@Component({
  selector: 'app-softphone',
  templateUrl: './softphone.component.html',
  styleUrls: ['./softphone.component.css']
})
export class SoftphoneComponent implements OnInit {

  title = 'softphone';
  form: FormGroup;
  formLogin: FormGroup;
  isLogin: boolean = false;
  qr_3cx: string = null;
  isActive: boolean = false;
  selectedDep: number;
  phones = [];
  department = [];
  build = [];
  floor = [];
  decode = '';
  message = '';

  constructor(
    private fb: FormBuilder,
    private service: SerivceService,
    private router: Router
  ) {
    registerLocaleData(localeTH);
  }

  ngOnInit(): void {
    this.initForm();
    // this.qr_3cx = 'HTTPS://INTER-VOIP.3CX.ASIA:5001/P/VWVBCNHS0IW0/UY3HKG7GXH8088';
    this.qr_3cx = 'HTTPS://INTER-VOIP.3CX.ASIA:5001';

  }

  initForm() {
    this.form = this.fb.group({
      no: [''],
      department: ['', Validators.required],
      room: [''],
      area: [''],
      floor: [''],
      build: [null],
      responder: [''],
      phone: [''],
      phone_type: ['1', Validators.required],
      softphone: ['1', Validators.required],
      isactive: ['1', Validators.required],
    });

    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      hour: 12,
      module: ""
    });

    this.getDepartment();
    this.getBuild();
    this.getFloor();
  }

  getDepartment() {
    this.service.department().subscribe(response => {
      this.department = response.result;
    })
  }

  getBuild() {
    this.service.build().subscribe(response => {
      this.build = response.result;
      this.form.get('build').patchValue(null);
    })
  }

  getFloor() {
    this.service.floor().subscribe(response => {
      this.floor = response.result;
      this.form.get('floor').patchValue(null);
    })
  }

  getResponder(name: string) {
    this.service.responder({ responder: name }).subscribe(response => {
      if (response.result[0] !== undefined) {
        this.message = 'ท่านได้ลงทะบียนใช้งานเรียบร้อยแล้ว';
        this.formLogin.get('username').patchValue('');
        this.formLogin.get('password').patchValue('');
        this.isLogin = false;
      } else {
        this.form.get('department').patchValue(this.decode['department']);
        this.form.get('responder').patchValue(this.decode['fullName']);
        this.form.get('area').patchValue(this.decode['fullName']);
        let room = this.department.filter(element => element['id'] === this.decode['department']);
        this.form.get('room').patchValue(room[0]['name']);
        this.getPhone(this.decode['uid']);
      }
    })
  }

  onDepartmentChange(e: any) {
    if (e) {
      let room = this.department.filter(element => element['id'] === e.id);
      this.form.get('room').patchValue(room[0]['name']);
    }
  }

  getPhone(code: any) {
    this.service.phone(code).subscribe(response => {
      if (response.result[0] !== undefined) {
        this.form.get('no').patchValue(response.result[0]['no'])
        this.form.get('floor').patchValue(response.result[0]['floor']);
        this.form.get('build').patchValue(response.result[0]['build']);
        this.form.get('department').patchValue(response.result[0]['department']);
        this.form.get('area').patchValue(response.result[0]['area']);
        this.form.get('phone').patchValue(response.result[0]['no']);
        this.qr_3cx = response.result[0]['qr_3cx'];
      } else {
        this.message = 'ไม่พบเบอร์ที่ลงทะเบียนกับในระบบ';
        this.formLogin.get('username').patchValue('');
        this.formLogin.get('password').patchValue('');
        this.isLogin = false;
      }
    })
  }

  async onLogin() {
    this.message = '';
    if (this.formLogin.valid) {
      this.service.login(this.formLogin.value).subscribe(response => {
        if (response.ok) {
          this.isLogin = response.ok;
          const decoded = this.service.decodeToken(response.token)
            .then(resp => {
              this.decode = resp;
              this.getResponder(resp['fullName']);
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.message = 'กรุณาตรวจสอบ Username Password';
          this.formLogin.get('username').patchValue('');
          this.formLogin.get('password').patchValue('');
        }
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.updatePhone(this.form.value).subscribe(response => {
        console.log(response);
        if (response.status == 'ok') {
          this.router.navigate(['/softphones']);
        }
      })
    }
  }

}
