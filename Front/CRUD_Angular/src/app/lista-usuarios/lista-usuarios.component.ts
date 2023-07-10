import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { UsuarioService } from '../models/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  //Arreglo de usuarios
  usuarios: Observable<UsuarioModel[]> | undefined;

  //Inicializando el servicio
  constructor(private usuarioService : UsuarioService){

  }
  ngOnInit(){

    //Obteniendo usuarios y guardando dentro del arreglo
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //Método para borrar usuario
  borrarUsuario(id: string){
      this.usuarioService.borrarUsuario(id).subscribe(data =>{
        console.log(data);
      })

      this.usuarios = this.usuarioService.obtenerUsuarios();
  }
}
