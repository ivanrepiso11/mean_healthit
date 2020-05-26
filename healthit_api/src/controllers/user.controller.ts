import { Request, Response } from "express";
import User from "../models/user";

import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import path from "path";
import fs from 'fs-extra';

const key = 'secretKey';
const BCRYPT_SALT_ROUNDS = 12;

export async function loginUser(req: Request, res: Response): Promise<Response | undefined> {
    const { username, password } = req.body;
    const user = await usernameExist(username);
    if (user) {
        compare(password, user.password)
            .then(async function (samePassword: boolean) {
                if (!samePassword) {
                    return res.json({ status: 401, type: 'password', message: 'Contraseña incorrecta' });
                } else {
                    const token = sign({ id: user._id }, key, {
                        expiresIn: 60 * 60
                    });
                    return res.json({
                        status: res.statusCode,
                        type: 'login',
                        token: token,
                        usuario: user
                    });
                }
            }).catch(function (error) {
                console.log("Error loging user: ");
                console.log(error);
            });
    } else {
        return res.json({ status: 401, type: 'username', message: 'Nombre de usuario inexistente' });
    }
};

export async function createUser(req: Request, res: Response): Promise<Response | undefined> {
    const { username, name, password, confirmPasswd, image } = req.body;
    const user = await usernameValid(username);
    if (user) {
        if (password === confirmPasswd) {
            hash(password, BCRYPT_SALT_ROUNDS)
                .then(async function (hashedPassword: string) {
                    const newUser = {
                        name: name,
                        username: username,
                        password: hashedPassword,
                        imagePath: image
                    };
                    if (newUser) {
                        const userNew = new User(newUser);
                        await userNew.save();
                        const token = sign({ id: userNew._id }, key, {
                            expiresIn: 60 * 60
                        });
                        return res.json({
                            status: res.statusCode,
                            type: 'registro',
                            message: 'Usuario creado',
                            usuario: userNew,
                            token: token
                        });
                    } else {
                        return res.json({ status: 401, type: 'new', message: 'Error en usuario para añadir' });
                    }
                }).catch(function (error) {
                    console.log("Error saving user: ");
                    console.log(error);
                });

        } else {
            return res.json({ status: 401, type: 'password', message: 'Las contraseñas no coinciden' });
        }
    } else {
        return res.json({ status: 401, type: 'username', message: 'Nombre de usuario no válido' });
    }
};

export async function getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (id != null && id.match(/^[0-9a-fA-F]{24}$/)) {
        const usuario = await getUserById(id);
        if (usuario) {
            return res.json({ status: res.statusCode, usuario: usuario });
        } else {
            return res.json({ status: 401, type: 'id', message: 'Id incorrecto' });
        }
    } else {
        return res.json({ status: 401, type: 'id', message: 'Id no encontrado' });
    }
};

export async function getUsers(req: Request, res: Response): Promise<Response> {
    const usuarios = await User.find();
    if (usuarios) {
        return res.json({
            status: res.statusCode,
            usuario: usuarios
        });
    } else {
        return res.json({ status: 401, type: 'get', message: 'No existen usuarios' });
    }
};

export async function updateUser(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    const { username, name, password, confirmPasswd } = req.body;
    if (id != null && id.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await getUserById(id);
        if (user) {
            const nameUser = await usernameValid(username);
            if (nameUser === true || username === user.username) {
                if (password === confirmPasswd && password !== '') {
                    hash(password, BCRYPT_SALT_ROUNDS)
                        .then(async function (hashedPassword: string) {

                            const updUser = await User.findByIdAndUpdate(id, {
                                name: name,
                                username: username,
                                password: hashedPassword,
                                imagePath: req.file.path
                            });
                            if (updUser) {
                                const resultUser = await User.findById({ _id: updUser._id });
                                return res.json({
                                    status: res.statusCode,
                                    type: 'update',
                                    message: 'Usuario actualizado',
                                    user: resultUser
                                });
                            } else {
                                return res.json({ status: 401, type: 'update', message: 'El usuario buscado no existe o error al actualizar' });
                            }
                        }).catch(function (error) {
                            console.log("Error updating user: ");
                            console.log(error);
                        });

                } else if (password === '' && confirmPasswd === '') {
                    const updUser = await User.findByIdAndUpdate(id, {
                        name: name,
                        username: username,
                        password: user.password,
                        imagePath: req.file.path
                    });
                    if (updUser) {
                        const resultUser = await User.findById({ _id: updUser._id });
                        return res.json({
                            status: res.statusCode,
                            type: 'update',
                            message: 'Usuario actualizado',
                            user: resultUser
                        });
                    } else {
                        return res.json({ status: 401, type: 'update', message: 'El usuario buscado no existe o error al actualizar' });
                    }
                } else {
                    return res.json({ status: 401, type: 'password', message: 'Las contraseñas no coinciden' });
                }
            } else {
                return res.json({ status: 401, type: 'username', message: 'Nombre de usuario no valido' });
            }
        } else {
            return res.json({ status: 401, type: 'id', message: 'Usuario no encontrado' });
        }
    } else {
        return res.json({ status: 401, type: 'id', message: 'Id parametro erróneo' });
    }
};

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const userDel = await User.findByIdAndRemove(id);
        if (userDel) {
            if (userDel.imagePath !== '') {
                await fs.unlink(path.resolve(userDel.imagePath));
                return res.json({
                    status: res.statusCode,
                    type: 'delete',
                    message: 'Usuario eliminado',
                    ejercicio: userDel
                });
            } else {
                return res.json({
                    status: res.statusCode,
                    type: 'delete',
                    message: 'Usuario eliminado',
                    ejercicio: userDel
                });
            }

        } else {
            return res.json({ status: 401, type: 'delete', message: 'El usuario buscado no existe' });
        }
    } else {
        return res.json({ status: 401 });
    }
};

async function getUserById(id: string) {
    if (id != null && id.match(/^[0-9a-fA-F]{24}$/)) {
        const usuario = await User.findById({ _id: id });
        return usuario;
    } else {
        return null;
    }
};

async function usernameValid(username: string): Promise<Boolean> {
    var value = false;
    const usuario = await User.findOne({ username: username })
    if (!usuario) {
        value = true;
    }
    return value;
};

async function usernameExist(username: string) {
    const usuario = await User.findOne({ username: username })
    return usuario;
};

