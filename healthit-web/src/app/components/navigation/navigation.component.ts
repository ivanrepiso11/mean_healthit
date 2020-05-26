import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  id: string;
  usuario: User;
  bUsuario = false;
  bEjercicio = false;
  sourceImage;

  constructor(protected authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.id = localStorage.getItem('usuario');
    this.authService.user(this.id).subscribe(
      res => {
        this.usuario = res.usuario;
        if (this.usuario.imagePath === '') {
          this.sourceImage = 'assets/no-image.png';
        } else {
          this.sourceImage = 'http://localhost:3000/' + this.usuario.imagePath;
        }
      },
      err => console.log(err)
    );
  }

  active(param: string) {
    this.bUsuario = false;
    this.bEjercicio = false;
    if (param === 'e') {
      this.bEjercicio = true;
    } else {
      this.bUsuario = true;
    }
  }

  logout(){
    this.authService.logout();
    this.toastr.info('Sesión cerrada correctamente');
  }

  user() {
    this.router.navigate(['/usuarios/' + this.id]);
  }
}
