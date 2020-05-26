import { Router } from "express";
import { createEjercicio, deleteEjercicio, getEjercicio, getEjercicios, updateEjercicio } from "../controllers/ejercicio.controller";
import multer from "../libs/multer";

const router = Router();

router.route('/ejercicios')
    .get(getEjercicios)
    .post(createEjercicio);
    

router.route('/ejercicios/:id')
    .get(getEjercicio)
    .put(multer.single('image'), updateEjercicio)
    .patch(updateEjercicio)
    .delete(deleteEjercicio);


export default router;