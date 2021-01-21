import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { TokenStorageService } from '../../shared/token-storage.service';
import { MettingService } from '../metting.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-metting-list',
  templateUrl: './metting-list.component.html',
  styleUrls: ['./metting-list.component.css']
})
export class MettingListComponent implements OnInit {

  isLogin: boolean = false;
  formSearch: FormGroup;
  locale = 'th-be';
  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-dark-blue';
  duration = '';
  durations = [];
  mettings: Array<any> = [];
  totalpage = 0;
  current_page = 1;
  last_page = 1;
  pageNumber = 1;
  row: any;
  modalRef: BsModalRef;
  modalView: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };
  userInfo: any = {};
  isAdmin: boolean = false;
  qr_code: string = null;
  link_url: string = '';

  constructor(
    private fb: FormBuilder,
    // private router: Router,
    private tokenStorageService: TokenStorageService,
    private mettingService: MettingService,
    private modalService: BsModalService,
    private localeService: BsLocaleService,
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken() !== null) {
      this.isLogin = true;
      this.userInfo = this.tokenStorageService.getUser();
      this.mettingService.getLevel(this.userInfo.uid).subscribe(response => {
        if (response.rows !== undefined) {
          this.isAdmin = true;
        }
      })
    }
    this.initForm();
    this.list('1');
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.qr_code = 'https://www.kkh.go.th/';
  }

  initForm() {
    this.formSearch = this.fb.group({
      search: [''],
      date: [null],
      page: [this.pageNumber, Validators.required]
    });
  }

  list(page: any) {
    this.formSearch.patchValue({ page: page });
    this.mettingService.listMetting(this.formSearch.value).subscribe(response => {
      this.mettings = response.rows;
      this.totalpage = parseInt(response.totalpage);
      this.pageNumber = response.page;
      this.current_page = parseInt(response.page);
    })
  }

  onView(templateView: TemplateRef<any>, row: any) {
    this.qr_code = row.link_url;
    this.link_url = row.link_url;
    this.modalView = this.modalService.show(templateView, this.config);
  }

  onAdd(template: TemplateRef<any>) {
    this.row = {};
    this.modalRef = this.modalService.show(template, this.config);
  }

  onEdit(template: TemplateRef<any>, row: any) {
    this.row = row;
    this.modalRef = this.modalService.show(template, this.config);
  }

  onDelete(row) {
    Swal.fire({
      // title: 'Are you sure?',
      text: "คุณต้องการลบข้อมูลนี้",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mettingService.deleteMetting(row.id).subscribe(response => {
          this.list(this.pageNumber);
        })
      }
    })
  }

  closeForm() {
    this.list(1);
    this.modalRef.hide();
  }

  onSubmit() {
    this.list(1);
  }

  pageChanged(page: number) {
    if ((page <= this.totalpage) && (page >= 1)) {
      this.list(page)
    }
  }

  pageInput() {
    let page = this.pageNumber;
    if (page <= this.totalpage && page >= 1) {
      this.list(this.pageNumber);
    } else {
      this.pageNumber = this.current_page;
    }
  }

}
