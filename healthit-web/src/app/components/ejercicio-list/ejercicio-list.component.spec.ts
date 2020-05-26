import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioListComponent } from './ejercicio-list.component';

describe('EjercicioListComponent', () => {
  let component: EjercicioListComponent;
  let fixture: ComponentFixture<EjercicioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjercicioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
