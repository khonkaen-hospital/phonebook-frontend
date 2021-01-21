import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MettingComponent } from './metting.component';

describe('MettingComponent', () => {
  let component: MettingComponent;
  let fixture: ComponentFixture<MettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
