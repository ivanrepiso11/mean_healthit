import { Component, OnInit } from '@angular/core';
import { EjercicioService } from '../../services/ejercicio.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ejercicio-list',
  templateUrl: './ejercicio-list.component.html',
  styleUrls: ['./ejercicio-list.component.css']
})
export class EjercicioListComponent implements OnInit {

  allEjercicios;
  ejerciciosMostrar = [];
  sourceImage = 'assets/no-image.png';
  filtro = {
    genero: ['hombre', 'mujer'],
    material: ['si', 'no'],
    lugar: ['casa', 'gimnasio']
  };

  seleccionadoGen = '';
  seleccionadoMat = '';
  seleccionadoLug = '';

  constructor(private ejercicioService: EjercicioService, private router: Router, protected authService: AuthService) { }

  ngOnInit() {
    this.ejercicioService.getEjercicios()
      .subscribe(
        res => {
          this.ejerciciosMostrar = res.ejercicio;
          this.allEjercicios = res.ejercicio;
        },
        err => console.log(err)
      );
  }

  filtrador() {
    this.ejerciciosMostrar = [];
    if (this.seleccionadoGen !== '' && this.seleccionadoLug !== '' && this.seleccionadoMat !== '') {
      this.allEjercicios.forEach(z => {
        if (!this.ejerciciosMostrar.includes(z)) {
          if (z.genero === this.seleccionadoGen && z.lugar === this.seleccionadoLug && z.material === this.seleccionadoMat) {
            this.ejerciciosMostrar.push(z);
          }
        }
      });
    } else if (this.seleccionadoGen !== '' && this.seleccionadoLug !== '') {
      this.allEjercicios.forEach(z => {
        if (!this.ejerciciosMostrar.includes(z)) {
          if (z.genero === this.seleccionadoGen && z.lugar === this.seleccionadoLug) {
            this.ejerciciosMostrar.push(z);
          }
        }
      });
    } else if (this.seleccionadoMat !== '' && this.seleccionadoLug !== '') {
      this.allEjercicios.forEach(z => {
        if (!this.ejerciciosMostrar.includes(z)) {
          if (z.material === this.seleccionadoMat && z.lugar === this.seleccionadoLug) {
            this.ejerciciosMostrar.push(z);
          }
        }
      });
    } else if (this.seleccionadoMat !== '' && this.seleccionadoGen !== '') {
      this.allEjercicios.forEach(z => {
        if (!this.ejerciciosMostrar.includes(z)) {
          if (z.genero === this.seleccionadoGen && z.material === this.seleccionadoMat) {
            this.ejerciciosMostrar.push(z);
          }
        }
      });
    } else if (this.seleccionadoMat !== '') {
      this.allEjercicios.forEach(z => {
        if (!this.ejerciciosMostrar.includes(z)) {
          if (z.material === this.seleccionadoMat) {
            this.ejerciciosMostrar.push(z);
          }
        }
      });
    } else if (this.seleccionadoGen !== '') {
      this.allEjercicios.forEach(z => {
        if (!this.ejerciciosMostrar.includes(z)) {
          if (z.genero === this.seleccionadoGen) {
            this.ejerciciosMostrar.push(z);
          }
        }
      });
    } else if (this.seleccionadoLug !== '') {
      this.allEjercicios.forEach(z => {
        if (!this.ejerciciosMostrar.includes(z)) {
          if (z.lugar === this.seleccionadoLug) {
            this.ejerciciosMostrar.push(z);
          }
        }
      });
    } else {
      this.ejerciciosMostrar = this.allEjercicios;
    }
  }

  selectedCard(id: string) {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/ejercicios/admin/' + id]);
    } else {
      this.router.navigate(['/ejercicios/' + id]);
    }
  }

}
