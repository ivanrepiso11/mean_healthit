import express from 'express';
import morgan from "morgan";
import routerEjercicio from "./routes/ejercicio";
import routerUser from "./routes/user";
import path from "path";
import cors from 'cors';

const app = express();

//ajustes
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//rutas
app.use('/api', routerEjercicio);
app.use('/api', routerUser);

// carpeta de almacenamiento de archivos publicos para la direccion /uploads
// path.resolve busca la carpeta sin poner la dirección completa
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;