import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  URI = 'http://localhost:3000/api/ejercicios';

  constructor(private http: HttpClient) { }

  createEjercicio(nombre: string, image: string, series: string,
    repeticiones: string, descanso: string, genero: string,
    material: string, lugar: string, zonaCuerpo: string, link: string) {
    return this.http.post<any>(this.URI, {
      nombre, image,  series, repeticiones,
      descanso, genero, material, lugar, zonaCuerpo, link
    });
  }

  getEjercicios() {
    return this.http.get<any>(this.URI);
  }

  getEjercicio(id: string) {
    return this.http.get<any>(this.URI + '/' + id);
  }

  deleteEjercicio(id: string) {
    return this.http.delete<any>(this.URI + '/' + id);
  }

  updateEjercicio(id: string, nombre: string, image: File, series: string,
    repeticiones: string, descanso: string, genero: string,
    material: string, lugar: string, zonaCuerpo: string, link: string) {
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('image', image);
    fd.append('series', series);
    fd.append('repeticiones', repeticiones);
    fd.append('descanso', descanso);
    fd.append('genero', genero);
    fd.append('material', material);
    fd.append('lugar', lugar);
    fd.append('zonaCuerpo', zonaCuerpo);
    fd.append('link', link);
    return this.http.put<any>(this.URI + '/' + id, fd);
  }
}
