import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioEditComponent } from './ejercicio-edit.component';

describe('EjercicioEditComponent', () => {
  let component: EjercicioEditComponent;
  let fixture: ComponentFixture<EjercicioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjercicioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
