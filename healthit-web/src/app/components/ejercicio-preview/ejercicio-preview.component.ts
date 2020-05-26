import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EjercicioService } from '../../services/ejercicio.service';
import { Ejercicio } from '../../interfaces/ejercicio';

@Component({
  selector: 'app-ejercicio-preview',
  templateUrl: './ejercicio-preview.component.html',
  styleUrls: ['./ejercicio-preview.component.css']
})
export class EjercicioPreviewComponent implements OnInit {

  id: string;
  ejercicio: Ejercicio;
  zonasEjercicio = [];

  sourceImage: string | ArrayBuffer = 'assets/no-image.png';

  constructor(private router: Router, private ejercicioService: EjercicioService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.id = params.id;
      this.ejercicioService.getEjercicio(this.id).subscribe(
        res => {
          this.ejercicio = res.ejercicio;
          if (this.ejercicio.imagePath !== '') {
            this.sourceImage = 'http://localhost:3000/' + this.ejercicio.imagePath;
          }
          this.zonasCuerpo();
        },
        err => console.log(err)
      );
    });

  }

  zonasCuerpo() {
    this.zonasEjercicio = [];
    const elementos = this.ejercicio.zonaCuerpo.split(',');
    if (elementos.length === 8) {
      this.zonasEjercicio.push('Full body');
    } else {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < elementos.length; i++) {
        this.zonasEjercicio.push(elementos[i]);
      }
    }
  }

}
