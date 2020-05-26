import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id: string;
  usuario: User;
  password = '';
  confirmPasswd = '';

  ext = ['.png', '.jpg', '.gif', '.jpeg'];

  file: File;
  sourceImage: string | ArrayBuffer = 'assets/no-image.png';

  constructor(private router: Router, protected authService: AuthService, private activateRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;
      this.authService.user(params.id).subscribe(
        res => {
          this.usuario = res.usuario;
          if (this.usuario.imagePath !== '') {
            this.sourceImage = 'http://localhost:3000/' + this.usuario.imagePath;
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

  updateUser(): boolean {
    console.log(this.file)
    this.authService.update(this.id, this.usuario.name, this.file, this.usuario.username, this.password, this.confirmPasswd)
      .subscribe(
        res => {
          if (res.status === 200) {
            if (this.authService.isAdmin()) {
              this.router.navigate(['/usuarios']);
            } else {
              this.toastr.success(res.message);
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }
          } else if (res.type === 'password') {
            this.toastr.error(res.message);
          } else if (res.type === 'username') {
            this.toastr.error(res.message);
          }

        },
        err => console.log(err)
      );
    return false;
  }

}
