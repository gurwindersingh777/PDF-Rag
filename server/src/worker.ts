import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import { Document } from "@langchain/core/documents"
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CharacterTextSplitter } from '@langchain/textsplitters';

const connection = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null
});

const worker = new Worker('file-upload-queue', async (job) => {
  const loader = new PDFLoader(job.data.path);
  const docs = await loader.load();

  const textSplitter = new CharacterTextSplitter({ chunkSize: 300, chunkOverlap: 0 })

  const texts = await textSplitter.splitText(docs);
  console.log(texts);

},
  { concurrency: 100, connection }
);
