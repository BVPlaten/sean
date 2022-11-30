import express from "express"
import path from "path"
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.static(path.join(__dirname, '/public')));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))
app.use('/libs/', express.static(path.join(__dirname, 'node_modules/three/addons/libs')))

app.listen(3000, () => console.log('Visit http://127.0.0.1:3000'))

//const express = require('express')
//const app = express()
//const path = require('path')
//app.use(express.static(__dirname + '/public'))
