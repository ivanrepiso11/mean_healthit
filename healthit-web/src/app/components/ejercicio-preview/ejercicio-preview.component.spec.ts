import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioPreviewComponent } from './ejercicio-preview.component';

describe('EjercicioPreviewComponent', () => {
  let component: EjercicioPreviewComponent;
  let fixture: ComponentFixture<EjercicioPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjercicioPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
