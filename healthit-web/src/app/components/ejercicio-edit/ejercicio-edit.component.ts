import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ejercicio } from '../../interfaces/ejercicio';
import { Router, ActivatedRoute } from '@angular/router';
import { EjercicioService } from '../../services/ejercicio.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-ejercicio-edit',
  templateUrl: './ejercicio-edit.component.html',
  styleUrls: ['./ejercicio-edit.component.css']
})
export class EjercicioEditComponent implements OnInit {

  id: string;
  ejercicio: Ejercicio;
  zCuerpo: Array<any> = [
    { name: 'hombro', selected: '' },
    { name: 'biceps', selected: '' },
    { name: 'triceps', selected: '' },
    { name: 'espalda', selected: '' },
    { name: 'pecho', selected: '' },
    { name: 'core', selected: '' },
    { name: 'glúteo', selected: '' },
    { name: 'pierna', selected: '' }];
  zonas = null;
  masterSelected = false;
  checkedList;
  zonasEjercicio;

  ext = ['.png', '.jpg', '.gif', '.jpeg'];

  file: File;
  sourceImage: string | ArrayBuffer = 'assets/no-image.png';

  @ViewChild('modalEliminar', { static: false }) modalEliminar: ElementRef;
  @ViewChild('modalPhoto', { static: false }) modalPhoto: ElementRef;

  constructor(private router: Router, private ejercicioService: EjercicioService, private activateRoute: ActivatedRoute,
    private toastr: ToastrService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;
      this.ejercicioService.getEjercicio(this.id).subscribe(
        res => {
          this.ejercicio = res.ejercicio;
          if (this.ejercicio.imagePath !== '') {
            this.sourceImage = 'http://localhost:3000/' + this.ejercicio.imagePath;
            const extension = this.sourceImage.toString().split('.')[1];
            if (this.ext.includes('.' + extension)) {
              this.urltoFile(this.sourceImage, 'image.' + extension, 'image/' + extension)
                .then(file => this.file = file as File);
            } else if (extension === 'jpg') {
              this.urltoFile(this.sourceImage, 'image.jpg', 'image/jpeg')
                .then(file => this.file = file as File);
            } else {
              console.log('formato erroneo');
            }
          } else {
            this.urltoFile(this.sourceImage, 'image.png', 'image/png')
              .then(file => this.file = file as File);
          }
          this.checkboxItems();
        },
        err => console.log(err)
      );
    });
  }

  urltoFile(url, filename, mimeType) {
    return (fetch(url)
      .then(res => res.arrayBuffer())
      .then(buf => new File([buf], filename, { type: mimeType }))
    );
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0] as File;
      const reader = new FileReader();
      reader.onload = e => this.sourceImage = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  deleteEjercicio() {
    this.ejercicioService.deleteEjercicio(this.id)
      .subscribe(
        res => {
          this.toastr.success(res.message);
          this.router.navigate(['/ejercicios']);
        },
        err => console.log(err)
      );
  }

  eliminar() {
    this.modalService.open(this.modalEliminar);
  }

  modificarPhoto() {
    this.modalService.open(this.modalPhoto);
  }

  updateEjercicio(): boolean {
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
      this.ejercicioService.updateEjercicio(this.id, this.ejercicio.nombre, this.file, this.ejercicio.series, this.ejercicio.repeticiones,
        this.ejercicio.descanso, this.ejercicio.genero, this.ejercicio.material, this.ejercicio.lugar, this.zonas,
        this.ejercicio.link)
        .subscribe(
          res => {
            this.toastr.success(res.message);
            setTimeout(() => {
              window.location.reload();
            }, 700);
          },
          err => console.log(err)
        );
    }
    return false;
  }

  checkboxItems() {
    this.zonasEjercicio = [];
    const elementos = this.ejercicio.zonaCuerpo.split(',');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < elementos.length; i++) {
      this.zonasEjercicio.push(elementos[i]);
    }
    this.zCuerpo.map(x => {
      x.selected = false;
      if (this.zonasEjercicio.includes(x.name)) {
        x.selected = true;
      }
    });
    this.getCheckedItemList();
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
    this.masterSelected = false;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.zCuerpo.length; i++) {
      if (this.zCuerpo[i].selected) {
        this.checkedList.push(this.zCuerpo[i]);
      }
    }

    if (this.checkedList.length === this.zCuerpo.length) {
      this.masterSelected = true;
    }
  }

  changeCheckState(item) {
    item.selected = !item.selected;
    this.getCheckedItemList();
  }
}
