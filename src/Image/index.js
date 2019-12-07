import { resolve } from 'path';
import { readFileSync } from 'fs';

const raw_data = readFileSync(resolve(__dirname)+'/lansa.jpeg');

export default raw_data;