# CRUD_ANGULAR
Proyecto académico para un crud de usuarios. Desarrollado con Angular | Express | Mysql


# BASE DE DATOS

/*Creación base de datos*/
CREATE DATABASE crud_angular;
use crud_angular;

/*Creación de tablas*/
create table usuario (id int not null primary key auto_increment, 
nombre varchar(50) not null, 
email varchar(50) not null);