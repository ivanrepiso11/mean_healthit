import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuarios: any = [];
  p = 1;
  indice = 0;

  nombreUsuario;
  id;

  @ViewChild('modalEliminar', { static: false }) modal: ElementRef;

  constructor(private router: Router, protected authService: AuthService, private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.authService.users()
      .subscribe(
        res => {
          this.usuarios = res.usuario;
        },
        err => console.log(err)
      );
  }

  editar(id: string) {
    this.router.navigate(['/usuarios/' + id]);
  }

  eliminar(id: string) {
    this.id = id;
    this.authService.user(id).subscribe(
      res => {
        this.nombreUsuario = res.usuario.username;
        this.modalService.open(this.modal);
      }
    );
  }

  deleteUser() {
    this.authService.deleteUser(this.id)
      .subscribe(
        res => {
          this.toastr.success(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        },
        err => console.log(err)
      );
  }

}
