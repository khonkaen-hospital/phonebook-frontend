import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { SerivceService } from 'src/app/shared/serivce.service';
import { registerLocaleData } from '@angular/common';
import localeTH from '@angular/common/locales/th';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {

  title = 'phonebook';
  formSearch: FormGroup;
  phones = [];
  telemedicines = [];
  totalpage = 0;
  current_page = 1;
  last_page = 1;
  pageNumber = 1;
  numberType = 1;

  constructor(private fb: FormBuilder,
    private service: SerivceService) {
    registerLocaleData(localeTH);
  }

  ngOnInit(): void {
    this.initForm();
    this.phoneData('1');
  }

  initForm() {
    this.formSearch = this.fb.group({
      numberType: ['1', Validators.required],
      search: [''],
      page: [this.pageNumber, Validators.required]
    });
    this.onChanges();
  }

  onChanges(): void {
    this.formSearch.get('numberType').valueChanges.subscribe(val => {
      this.numberType = val;
      this.onSubmit();
    });
  }

  phoneData(page: any) {
    this.formSearch.patchValue({ page: page });
    this.service.find(this.formSearch.value).subscribe(response => {
      this.phones = response.result;
      this.totalpage = parseInt(response.totalpage);
      this.pageNumber = response.page;
      this.current_page = parseInt(response.page);
    })
  }

  onSubmit() {
    this.formSearch.patchValue({ page: 1 })
    if (this.formSearch.valid) {
      this.service.find(this.formSearch.value).subscribe(response => {
        this.phones = response.result;
        this.totalpage = parseInt(response.totalpage);
        this.pageNumber = response.page;
        this.current_page = parseInt(response.page);
      })
    }
  }

  pageChanged(page: number) {
    if ((page <= this.totalpage) && (page >= 1)) {
      this.phoneData(page)
    }
  }

  pageInput() {
    let page = this.pageNumber;
    if (page <= this.totalpage && page >= 1) {
      this.phoneData(this.pageNumber);
    } else {
      this.pageNumber = this.current_page;
    }
  }

}
