import multer from "multer";
import path from "path";

const ext = ['.png', '.jpg', '.gif', '.jpeg'];

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        if (ext.includes(path.extname(file.originalname))) {
            cb(null, req.params.id + path.extname(file.originalname));
        } else {
            cb(null, 'error');
        }

    }
});

export default multer({ storage });

// configuracion de multer para el almacenamiento de las imagenes
// subidas al servidor y su posterior obtencion para el frontend