import path, { extname } from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file , cb){
        cb(null , '/uploads') //null for error
    },
    filename(req, file ,cn){
        cn(null, `${this.file.filename}-${Date.now()}${path.extname(file.originalname)}`);
    }});

    function checkFileType(file,cb){
        const filetypes = /jpg|jpeg|png/;
        const extname = filetypes.test(path.extname(file.extname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if(extname && mimetype){
            return cb(null,true)
        }else{
            return cb('Images only!');
        }
    }

export default router;