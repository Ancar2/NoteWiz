import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authBlockGuard } from './auth-block-guard';

describe('authBlockGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authBlockGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
