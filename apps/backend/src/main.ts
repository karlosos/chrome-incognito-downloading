import express, { Request, Response } from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/generate-file', (req: Request, res: Response): void => {
  const sizeInMb = parseFloat(req.query.size as string);

  if (isNaN(sizeInMb) || sizeInMb <= 0) {
    res.status(400).send('Invalid size parameter.');
    return; // make sure this is a real early exit
  }

  const sizeInBytes = sizeInMb * 1024 * 1024;
  const chunk = 'A'.repeat(1024 * 1024); // 1MB chunk
  const totalChunks = Math.floor(sizeInBytes / chunk.length);

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=${sizeInMb}MB-file.txt`
  );

  let sentChunks = 0;

  const sendChunk = () => {
    while (sentChunks < totalChunks) {
      const canContinue = res.write(chunk);
      sentChunks++;

      if (!canContinue) {
        res.once('drain', sendChunk);
        return;
      }
    }
    res.end();
  };

  sendChunk();
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
