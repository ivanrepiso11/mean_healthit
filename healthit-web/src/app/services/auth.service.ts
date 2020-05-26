import { Injectable } from '@angular/core';
import { HttpClient/* , HttpHeaders */ } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

  registro(name: string, username: string, password: string,
    confirmPasswd: string, image: string) {
    return this.http.post<any>(this.URL + '/registro', {
      name, username, password, confirmPasswd, image
    });
  }

  login(usuario) {
    return this.http.post<any>(this.URL + '/login', usuario);
  }

  update(id: string, name: string, image: File, username: string, password: string,
    confirmPasswd: string) {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('username', username);
    fd.append('password', password);
    fd.append('confirmPasswd', confirmPasswd);
    if (image === undefined) {
      fd.append('image', '');
    } else {
      fd.append('image', image);
    }

    return this.http.put<any>(this.URL + '/users/' + id, fd);
  }

  getIdUser() {
    return localStorage.getItem('usuario');
  }

  user(id: string) {
    return this.http.get<any>(this.URL + '/users/' + id);
  }

  users() {
    return this.http.get<any>(this.URL + '/users');
  }

  deleteUser(id: string) {
    return this.http.delete<any>(this.URL + '/users/' + id);
  }

  logeado() {
    return !!localStorage.getItem('token');
    // si tiene token true, sino false
    // las !! es la sentencia true de lo que pidamos
  }

  isAdmin() {
    return localStorage.getItem('administrador');
    // si tiene administrador true, sino false
  }

  getToken() {
    // recoge el token del localStorage
    return localStorage.getItem('token');
  }

  getAdmin() {
    // recoge el admin del localStorage
    return localStorage.getItem('administrador');
  }

  logout() {
    if (this.isAdmin()) {
      localStorage.removeItem('administrador');
    } else {
      localStorage.removeItem('usuario');
    }
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
