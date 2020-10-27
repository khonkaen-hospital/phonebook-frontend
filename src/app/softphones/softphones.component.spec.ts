import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftphonesComponent } from './softphones.component';

describe('SoftphonesComponent', () => {
  let component: SoftphonesComponent;
  let fixture: ComponentFixture<SoftphonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftphonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftphonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
