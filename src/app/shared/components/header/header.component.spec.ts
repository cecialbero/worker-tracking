import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a title', () => {
    const titleContainer = fixture.debugElement.nativeElement.querySelector('header h1');

    expect(titleContainer.textContent).not.toBe('');
  });

  /*it('should show the avatar image if the avatar property has a value', () => {
    const avatarImage = fixture.debugElement.nativeElement.querySelector('header img');

    expect(avatarImage);
  });*/

  // should show the avatar image
  // should show the name and lastname initials if there's no avatar image
  // should show the user options when clicking on the avatar arrow
});
