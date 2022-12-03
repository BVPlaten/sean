import express from "express"
import path from "path"
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

// https://www.honeybadger.io/blog/import-maps/

app.use(express.static(path.join(__dirname, '/public')));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/threebase/', express.static(path.join(__dirname, 'node_modules/three')))

app.listen(3000, () => console.log('Visit http://127.0.0.1:3000'))