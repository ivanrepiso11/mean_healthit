import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user = {
    name: '',
    username: '',
    password: '',
    confirmPasswd: ''
  };

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  registro() {
    if (this.user.name === '' || this.user.username === '' || this.user.password === '' || this.user.confirmPasswd === '') {
      this.toastr.error('Todos los campos son requeridos');
    } else {
      this.authService.registro(this.user.name, this.user.username, this.user.password, this.user.confirmPasswd, '')
        .subscribe(
          res => {
            if (res.status === 200) {
              if (res.usuario.username === 'administrador') {
                localStorage.setItem('administrador', res.usuario._id);
              } else {
                localStorage.setItem('usuario', res.usuario._id);
              }
              localStorage.setItem('token', res.token);
              this.toastr.info('Bienvenido ' + res.usuario.name);
              this.router.navigate(['/ejercicios']);
            } else if (res.type === 'password') {
              this.toastr.error(res.message);
            } else if (res.type === 'username') {
              this.toastr.error(res.message);
            }
          },
          err => console.log(err)
        );
    }
  }

}
