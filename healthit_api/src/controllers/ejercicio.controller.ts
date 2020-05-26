import { Request, Response } from "express";
import Ejercicio from "../models/ejercicio";
import path from "path";
import fs from 'fs-extra';


export async function getEjercicio(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (id != null && id.match(/^[0-9a-fA-F]{24}$/)) {
        const ejercicio = await Ejercicio.findById(id);
        if (ejercicio) {
            return res.json({
                status: res.statusCode,
                ejercicio: ejercicio
            });
        } else {
            return res.json({ status: 401, type: 'get', message: 'El ejercicio buscado no existe' });
        }
    } else {
        return res.json({ status: 401 });
    }
};

export async function getEjercicios(req: Request, res: Response): Promise<Response> {
    const ejercicios = await Ejercicio.find();
    if (ejercicios) {
        return res.json({
            status: res.statusCode,
            ejercicio: ejercicios
        });
    } else {
        return res.json({ status: 401, type: 'get', message: 'No existen ejercicios' });
    }
};

export async function deleteEjercicio(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (id != null && id.match(/^[0-9a-fA-F]{24}$/)) {
        const ejercicioDel = await Ejercicio.findByIdAndRemove(id);
        if (ejercicioDel) {
            if (ejercicioDel.imagePath !== '') {
                await fs.unlink(path.resolve(ejercicioDel.imagePath));
                return res.json({
                    status: res.statusCode,
                    type: 'delete',
                    message: 'Ejercicio eliminado',
                    ejercicio: ejercicioDel
                });
            } else {
                return res.json({
                    status: res.statusCode,
                    type: 'delete',
                    message: 'Ejercicio eliminado',
                    ejercicio: ejercicioDel
                });
            }
        } else {
            return res.json({ status: 401, type: 'delete', message: 'El ejercicio buscado no existe' });
        }
    } else {
        return res.json({ status: 401 });
    }
};

export async function updateEjercicio(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombre, series, repeticiones, descanso, genero, material, lugar, zonaCuerpo, link } = req.body;
    if (id != null && id.match(/^[0-9a-fA-F]{24}$/)) {
        const ejercicioUpd = await Ejercicio.findByIdAndUpdate(id, {
            nombre: nombre, imagePath: req.file.path, series: series, repeticiones: repeticiones, descanso: descanso, genero: genero,
            material: material, lugar: lugar, zonaCuerpo: zonaCuerpo, link: link
        });
        if (ejercicioUpd) {
            const resultEjercicio = await Ejercicio.findById({ _id: ejercicioUpd._id });
            return res.json({
                status: res.statusCode,
                type: 'update',
                message: 'Ejercicio modificado',
                ejercicio: resultEjercicio
            });
        } else {
            return res.json({ status: 401, type: 'update', message: 'El ejercicio buscado no existe o error al actualizar' });
        }
    } else {
        return res.json({ status: 401 });
    }


};

export async function createEjercicio(req: Request, res: Response): Promise<Response> {
    const { nombre, image, series, repeticiones, descanso, genero, material, lugar, zonaCuerpo, link } = req.body;
    const newEjercicio = {
        nombre: nombre, imagePath: image, series: series, repeticiones: repeticiones, descanso: descanso, genero: genero,
        material: material, lugar: lugar, zonaCuerpo: zonaCuerpo, link: link
    };
    if (newEjercicio) {
        const ejercicioNew = new Ejercicio(newEjercicio);
        await ejercicioNew.save();

        return res.json({
            status: res.statusCode,
            type: 'new',
            message: 'Ejercicio creado',
            ejercicio: ejercicioNew
        });
    } else {
        return res.json({ status: 401, type: 'new', message: 'Error en ejercicio para añadir' });
    }
};