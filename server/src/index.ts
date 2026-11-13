import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

const connection = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
});

const queue = new Queue('file-upload-queue', { connection });

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
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ message: 'OK' });
});

app.post('/upload/pdf', upload.single('pdf'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No PDF file uploaded' });
  }

  await queue.add('file-ready', {
    filename: req.file.originalname,
    destination: req.file.destination,
    path: req.file.path,
  });

  return res.json({ message: 'uploaded', file: req.file });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
