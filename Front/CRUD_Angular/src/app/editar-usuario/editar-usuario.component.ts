import { UsuarioService } from './../models/usuario.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  //Definición de variables necesarias
  id = '';
  usuario = new UsuarioModel("","","");

  constructor(
    private UsuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    //Rescatando el id que entra
    this.id = this.route.snapshot.params['id']
    //Validando si llega un id
    if(this.id){
      console.log('Editando');
      this.UsuarioService.obtenerUsuario(this.id).subscribe(data =>{
        this.usuario = data[0];
      })
    }else{
      console.log("Crear");

    }
  }

  //método que envía la información
  onSubmit(){

    console.log("Enviando");

    if(this.usuario.id){
      this.UsuarioService.actualizarUsuario(this.usuario).subscribe(data =>{
       alert(data)
       this.router.navigate(['/usuarios'])
      })
    }else{
      console.log("Crear");
      this.UsuarioService.agregarUsuario(this.usuario).subscribe(data =>{
        alert(data)
        this.router.navigate(['/usuarios'])
    })

  }
}
}
