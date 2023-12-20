import { TypeCarrera } from "../carrera-component/types";
export type TypeNoticia = {
    _id:string;
    titulo:string;
    cuerpo:string;
    img:string;
    id_carrera:TypeCarrera; 
    autor:string;
    creado:Date;
    actualizado:Date;
}