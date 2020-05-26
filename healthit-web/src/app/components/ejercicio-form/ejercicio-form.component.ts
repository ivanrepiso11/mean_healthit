import { Component, OnInit } from '@angular/core';
import { EjercicioService } from '../../services/ejercicio.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// interface HtmlInputEvent extends Event {
//   target: HTMLInputElement & EventTarget;
// }

@Component({
  selector: 'app-ejercicio-form',
  templateUrl: './ejercicio-form.component.html',
  styleUrls: ['./ejercicio-form.component.css']
})
export class EjercicioFormComponent implements OnInit {

  zCuerpo: Array<any> = [
    { name: 'hombro', selected: false },
    { name: 'biceps', selected: false },
    { name: 'triceps', selected: false },
    { name: 'espalda', selected: false },
    { name: 'pecho', selected: false },
    { name: 'core', selected: false },
    { name: 'glúteo', selected: false },
    { name: 'pierna', selected: false }];
  zonas = null;
  ejercicio = {
    nombre: '',
    series: '',
    repeticiones: '',
    descanso: '',
    genero: '',
    material: '',
    lugar: '',
    link: ''
  };
  masterSelected = false;
  checkedList;

  constructor(private ejercicioService: EjercicioService, private router: Router,
    private toastr: ToastrService) {
    this.getCheckedItemList();
  }

  ngOnInit() {
  }

  uploadEjercicio(): boolean {
    this.zCuerpo.forEach(z => {
      if (z.selected === true && this.zonas === null) {
        this.zonas = z.name;
      } else if (z.selected === true) {
        this.zonas += ',' + z.name;
      }
    });
    if (this.ejercicio.nombre === '' || this.ejercicio.series === '' || this.ejercicio.repeticiones === '' ||
      this.ejercicio.descanso === '' || this.ejercicio.link === '' || this.ejercicio.genero === '' ||
      this.ejercicio.material === '' || this.ejercicio.lugar === '' || this.zonas === null) {
      this.toastr.error('Todos los campos son requeridos');
    } else {
      this.ejercicioService.createEjercicio(this.ejercicio.nombre, /* this.file */'', this.ejercicio.series, this.ejercicio.repeticiones,
        this.ejercicio.descanso, this.ejercicio.genero, this.ejercicio.material, this.ejercicio.lugar, this.zonas,
        this.ejercicio.link)
        .subscribe(
          res => {
            this.router.navigate(['/ejercicios']);
            this.toastr.success(res.message);
          },
          err => console.log(err)
        );
    }
    return false;
  }

  checkUncheckAll() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.zCuerpo.length; i++) {
      this.zCuerpo[i].selected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.zCuerpo.every(i => {
      return i.selected === true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.zCuerpo.length; i++) {
      if (this.zCuerpo[i].selected) {
        this.checkedList.push(this.zCuerpo[i]);
      }
    }
  }

}
