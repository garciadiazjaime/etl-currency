import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);

function readFile(file) {
  if (!file) {
    throw (new Error('invalid parameters'));
  }

  return readFileAsync(file, 'utf-8');
}

export default readFile;
