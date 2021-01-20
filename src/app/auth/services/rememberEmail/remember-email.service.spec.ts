import { TestBed } from '@angular/core/testing';

import { RememberEmailService } from './remember-email.service';

describe('RememberEmailService', () => {
  let service: RememberEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RememberEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
