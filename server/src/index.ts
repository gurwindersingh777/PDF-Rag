import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const baseName = path.parse(file.originalname).name;
    cb(null, `${baseName}-${uniqueSuffix}.pdf`);
  },
});

const app = express();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ message: 'OK' });
});

app.post('/upload/pdf', upload.single('pdf'), (req: Request, res: Response) => {
  console.log(req.file);
  return res.json({ message: 'uploaded', file: req.file });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
