import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage: storage,
    limits: {
        files: 5,
        fileSize: 10 * 1024 * 1024  // 10 mb
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Please upload an image file'), false);
        }
    }
});