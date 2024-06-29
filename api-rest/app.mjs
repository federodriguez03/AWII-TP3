
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { obtenerProductos, obtenerProductoPorID, crearProducto, modificarProducto, eliminarProducto } from './modulo.mjs';

dotenv.config();
const app = express();
const PUERTO = process.env.PORT || 3000;



app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/productos', obtenerProductos);
app.get('/productos/:id', obtenerProductoPorID);
app.post('/productos', crearProducto);
app.put('/productos/:id', modificarProducto);
app.delete('/productos/:id', eliminarProducto);

app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});
