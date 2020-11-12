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
  firstActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: SerivceService,
    private router: Router
  ) {
    registerLocaleData(localeTH);
  }

  ngOnInit(): void {
    this.initForm();
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
      phone: [],
      email: [''],
      mobilephone: [''],
      phone_type: ['1', Validators.required],
      softphone: ['1', Validators.required],
      uid: ['', Validators.required],
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
        this.getPhone(this.decode['uid']);
      } else {
        this.form.get('uid').patchValue(this.decode['uid']);
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
        this.form.get('uid').patchValue(this.decode['uid'])
        this.form.get('no').patchValue(response.result[0]['no'])
        this.form.get('floor').patchValue(response.result[0]['floor']);
        this.form.get('build').patchValue(response.result[0]['build']);
        this.form.get('phone').patchValue(response.result[0]['no']);
        this.qr_3cx = response.result[0]['qr_3cx'];
        //this.form.get('department').patchValue(response.result[0]['department']);
        //this.form.get('area').patchValue(response.result[0]['area']);
        //this.form.get('room').patchValue(response.result[0]['room']);
      } else {
        this.service.softphones({ uid: this.decode['uid'] }).subscribe(_response => {
          if (_response.result !== undefined) {
            this.form.get('uid').patchValue(this.decode['uid'])
            this.form.get('no').patchValue(_response.result[0]['no'])
            this.form.get('floor').patchValue(_response.result[0]['floor']);
            this.form.get('build').patchValue(_response.result[0]['build']);
            this.form.get('department').patchValue(_response.result[0]['department']);
            this.form.get('area').patchValue(_response.result[0]['area']);
            this.form.get('phone').patchValue(_response.result[0]['no']);
            this.form.get('room').patchValue(_response.result[0]['room']);
            this.form.get('email').patchValue(_response.result[0]['email']);
            this.form.get('mobilephone').patchValue(_response.result[0]['tel_mobile']);
            this.qr_3cx = _response.result[0]['qr_3cx'];
          } else {
            this.message = 'ไม่พบเบอร์ที่ท่าน ลงทะเบียนกับในระบบ';
            this.formLogin.get('username').patchValue('');
            this.formLogin.get('password').patchValue('');
            this.isLogin = false;
          }
        })
      }
    })
  }

  async onLogin() {
    this.message = '';
    if (this.formLogin.valid) {
      this.service.login(this.formLogin.value).subscribe(response => {
        if (response.ok) {
          this.isLogin = response.ok;
          this.service.decodeToken(response.token)
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
        if (response.status == 'ok') {
          this.router.navigate(['/phones']);
        }
      })
    }
  }

}
