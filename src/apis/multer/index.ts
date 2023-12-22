import multer from "multer";

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, `${process.cwd()}/public/temp`);
    },
})

export default storage