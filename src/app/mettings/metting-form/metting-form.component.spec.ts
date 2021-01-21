import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MettingFormComponent } from './metting-form.component';

describe('MettingFormComponent', () => {
  let component: MettingFormComponent;
  let fixture: ComponentFixture<MettingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MettingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
