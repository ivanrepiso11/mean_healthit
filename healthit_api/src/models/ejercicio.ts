import { Schema, model, Document } from "mongoose";

const ejercicio = new Schema({
    nombre: String,
    imagePath: String,
    series: String,
    repeticiones: String,
    descanso: String,
    genero: String,
    lugar: String,
    material: String,
    zonaCuerpo: String,
    link: String
});

interface IEjercicio extends Document {
    nombre: string;
    imagePath: string;
    series: string;
    repeticiones: string;
    descanso: string;
    genero: string;
    lugar: string;
    material: string;
    zonaCuerpo: string;
    link: string;
}

export default model<IEjercicio>('Ejercicio', ejercicio);