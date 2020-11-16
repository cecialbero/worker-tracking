import { TestBed } from '@angular/core/testing';

import { OtherUsersInfoService } from './other-users-info.service';

describe('OtherUsersInfoService', () => {
  let service: OtherUsersInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherUsersInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
