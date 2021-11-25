import { TestBed } from '@angular/core/testing';

import { DimenService } from './dimen.service';

describe('DimenService', () => {
  let service: DimenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DimenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
