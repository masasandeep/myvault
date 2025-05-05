import { TestBed } from '@angular/core/testing';

import { PasswordmanagerService } from './passwordmanager.service';

describe('PasswordmanagerService', () => {
  let service: PasswordmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
