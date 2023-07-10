export class UsuarioModel{

  //Definiendo el modelo para la tabla de la base de datos
  constructor(
    public id: string,
    public nombre: string,
    public email: string
  ){}
}
