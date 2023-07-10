import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Definición de la url para el endpoint
  BASE_URL = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  //Funciones para el crud

  //Obtener todos los usuarios
  obtenerUsuarios(){
    return this.http.get<UsuarioModel[]>(this.BASE_URL+'/usuarios');
  }

  //Obtener usuario según id
  obtenerUsuario(id: string){
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios/${id}`);
  }

  //Agregar un usuario
  agregarUsuario(usuario: UsuarioModel){
    return this.http.post<string>(`${this.BASE_URL}/usuarios/agregar`, usuario);
  }

  //Actualizar un usuario según id
  actualizarUsuario(usuario: UsuarioModel){
    return this.http.put<string>(`${this.BASE_URL}/usuarios/editar/${usuario.id}`, usuario)
  }

  //Borrar un usuario según id
  borrarUsuario(id: string){
    return this.http.delete<string>(`${this.BASE_URL}/usuarios/borrar/${id}`);
  }
}
