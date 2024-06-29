// modules.mjs

import pg from 'pg';

const  { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'productos',
    password: 'fede2003',
    port: 5432,
});

export const obtenerProductos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM producto');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send('Error de servidor');
    }
};

export const obtenerProductoPorID = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM producto WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error de servidor');
    }
};

export const crearProducto = async (req, res) => {
    const { nombre, marca, categoria, stock } = req.body;
    try {
        await pool.query('INSERT INTO producto (nombre, marca, categoria, stock) VALUES ($1, $2, $3, $4)', [nombre, marca, categoria, stock]);
        res.status(201).send('Producto creado correctamente');
    } catch (error) {
        res.status(500).send('Error de servidor');
    }
};

export const modificarProducto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, marca, categoria, stock } = req.body;
    try {
        const result = await pool.query('UPDATE producto SET nombre = $1, marca = $2, categoria = $3, stock = $4 WHERE id = $5', [nombre, marca, categoria, stock, id]);
        if (result.rowCount > 0) {
            res.status(200).send('Producto modificado con éxito');
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error de servidor');
    }
};

export const eliminarProducto = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM producto WHERE id = $1', [id]);
        if (result.rowCount > 0) {
            res.status(200).send('Producto eliminado');
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error de servidor');
    }
};
