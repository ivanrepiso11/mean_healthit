import { TestBed } from '@angular/core/testing';

import { EjercicioService } from './ejercicio.service';

describe('EjercicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EjercicioService = TestBed.get(EjercicioService);
    expect(service).toBeTruthy();
  });
});
