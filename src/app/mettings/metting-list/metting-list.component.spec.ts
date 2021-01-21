import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MettingListComponent } from './metting-list.component';

describe('MettingListComponent', () => {
  let component: MettingListComponent;
  let fixture: ComponentFixture<MettingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MettingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MettingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
