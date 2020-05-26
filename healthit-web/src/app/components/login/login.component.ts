import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  login() {
    if (this.user.username === '' || this.user.password === '') {
      this.toastr.error('Todos los campos son requeridos');
    } else {
      this.authService.login(this.user)
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
            } else {
              this.toastr.error(res.message);
            }
          },
          err => console.log(err)
        );
    }
  }

}
