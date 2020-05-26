import { Router } from "express";
import { createUser, loginUser, updateUser, getUser, getUsers, deleteUser } from "../controllers/user.controller";
import multer from "../libs/multer";

const router = Router();

router.route('/registro')
    .post(createUser);

router.route('/login')
    .post(loginUser);

router.route('/users/:id')
    .get(getUser)
    .put(multer.single('image'), updateUser)
    .delete(deleteUser);

router.route('/users').
    get(getUsers);

export default router;


