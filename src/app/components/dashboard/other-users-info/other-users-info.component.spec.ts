import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUsersInfoComponent } from './other-users-info.component';

describe('OtherUsersInfoComponent', () => {
  let component: OtherUsersInfoComponent;
  let fixture: ComponentFixture<OtherUsersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherUsersInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUsersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
