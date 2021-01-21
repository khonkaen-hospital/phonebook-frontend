import { Component, OnInit, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeTH from '@angular/common/locales/th';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MettingService } from '../metting.service';
import { TokenStorageService } from '../../shared/token-storage.service';
import { ThaiDateAbbrPipe } from 'src/app/pipes/thai-date-abbr.pipe';

@Component({
  selector: 'app-metting-form',
  templateUrl: './metting-form.component.html',
  styleUrls: ['./metting-form.component.css']
})
export class MettingFormComponent implements OnInit {

  @Input() row: any;
  @Input() admin: any;
  @Output() close = new EventEmitter();

  form: FormGroup;
  locale = 'th-be';
  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-dark-blue';
  mytime: Date = new Date();
  isMeridian = false;
  hstep = 1;
  mstep = 10;
  timeHours = [
    { id: '1', value: '1' },
    { id: '2', value: '2' },
    { id: '3', value: '3' },
    { id: '4', value: '4' },
    { id: '5', value: '5' },
    { id: '6', value: '6' },
    { id: '7', value: '7' },
    { id: '8', value: '8' },
    { id: '9', value: '9' },
    { id: '10', value: '10' },
    { id: '11', value: '11' },
    { id: '12', value: '12' },
    { id: '13', value: '13' },
    { id: '14', value: '14' },
    { id: '15', value: '15' },
    { id: '16', value: '16' },
    { id: '17', value: '17' },
    { id: '18', value: '18' },
    { id: '19', value: '19' },
    { id: '20', value: '20' },
    { id: '21', value: '21' },
    { id: '22', value: '22' },
    { id: '23', value: '23' }
  ];
  timeMinutes = [
    { id: '00', value: '00' },
    { id: '05', value: '05' },
    { id: '10', value: '10' },
    { id: '15', value: '15' },
    { id: '20', value: '20' },
    { id: '25', value: '25' },
    { id: '30', value: '30' },
    { id: '40', value: '40' },
    { id: '45', value: '45' },
    { id: '50', value: '50' },
    { id: '55', value: '55' }
  ];
  durationHours = [
    { id: '0', value: '0 ชม.' },
    { id: '1', value: '1 ชม.' },
    { id: '2', value: '2 ชม.' },
    { id: '3', value: '3 ชม.' },
    { id: '4', value: '4 ชม.' },
    { id: '5', value: '5 ชม.' },
    { id: '6', value: '6 ชม.' },
    { id: '7', value: '7 ชม.' },
    { id: '8', value: '8 ชม.' },
    { id: '9', value: '9 ชม.' }
  ];
  durationMinutes = [
    { id: '0', value: '0 นาที' },
    { id: '10', value: '10 นาที' },
    { id: '15', value: '15 นาที' },
    { id: '20', value: '20 นาที' },
    { id: '30', value: '30 นาที' },
    { id: '40', value: '40 นาที' },
    { id: '45', value: '45 นาที' },
    { id: '50', value: '50 นาที' }
  ];
  isUpdate: boolean = false;
  isSaveing: boolean = false;

  userInfo: any = {};
  submitted: boolean = false;
  status = [];

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private mettingService: MettingService,
    private tokenStorageService: TokenStorageService) {
    registerLocaleData(localeTH);
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken() !== null) {
      this.userInfo = this.tokenStorageService.getUser();
    }
    if (this.admin) {
      this.getStatus();
    }
    this.initForm();
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    if (Object.entries(this.row).length !== 0) {
      this.isUpdate = true;
      this.form.patchValue(
        {
          metting_name: this.row.metting_name,
          date: new Date(this.row.date),
          time_hour: this.row.time_hour,
          time_minute: this.row.time_minute,
          duration_hour: this.row.duration_hour,
          duration_minute: this.row.duration_minute,
          remark: this.row.remark,
          telephone: this.row.telephone,
          link_url: this.row.link_url,
          status: +this.row.status,
          uid: this.row.uid
        }
      );
    }
  }

  initForm() {
    this.form = this.fb.group({
      metting_name: ['', [Validators.required]],
      date: ['', Validators.required],
      time_hour: [null, Validators.required],
      time_minute: [null, Validators.required],
      duration_hour: [null, Validators.required],
      duration_minute: [null, Validators.required],
      telephone: ['', Validators.required],
      remark: [''],
      link_url: [''],
      status: [null],
      uid: [],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.form.patchValue({ uid: this.userInfo.uid });
      this.isSaveing = true;
      if (this.isUpdate) {
        let row = { ...this.form.value, 'id': this.row.id }
        this.mettingService.editMetting(row).subscribe(response => {
          if (response.result == 'ok') {
            this.closeForm();
          }
        });
      } else {
        let row = { ...this.form.value, 'status': 1 }
        this.mettingService.addMetting(row).subscribe(response => {
          if (response.result == 'ok') {
            this.closeForm();
          }
        });
      }
    } else {
      this.isSaveing = false;
    }
  }

  getStatus() {
    this.mettingService.getStatus().subscribe(response => {
      this.status = response.rows;
    })
  }

  closeForm() {
    this.submitted = false;
    this.close.emit();
  }

  get f() { return this.form.controls; }

}
