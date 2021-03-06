import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { Cell } from '../interfaces/models';
import {
  convertToJSFileFormat,
  convertToCellsFormat,
} from '../cells-converter/converter';
import { defaultCellsContent } from '../consts/defaultContent';

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (_req, res) => {
    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.send(convertToCellsFormat(result));
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(
          fullPath,
          convertToJSFileFormat(defaultCellsContent),
          'utf-8'
        );
        res.send(defaultCellsContent);
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    // Take the list of cells from the request object
    // serialize them
    const { cells }: { cells: Cell[] } = req.body;

    // Write the cells into the file
    await fs.writeFile(fullPath, convertToJSFileFormat(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};
