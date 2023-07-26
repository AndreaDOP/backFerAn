const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
require('./conexion/conexion');
const Usuario = require('./model/userModel');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`<h1>Soy el Back del MERN</h1>`);
});

/* Insertamos nuevos clientes de contacto */
app.post('/contactos', async (req, res) => {
  console.log(req.body);
  const { nombre, email, mensaje } = req.body;

  console.log(`Mi nombre es ${nombre}, mi email es ${email} y el mensaje ${mensaje}`);

  const nuevoContacto = new Usuario({
    nombre,
    email,
    mensaje,
  });

  console.log(`Nuevo contacto a guardar: ${nuevoContacto}`);

  await nuevoContacto.save();

  res.json({
    mensaje: 'Contacto guardado exitosamente',
  });
});

/* Insertamos nuevos clientes de servicio */
app.post('/servicios', async (req, res) => {
  console.log(req.body);
  const { nombre, apellido, email, celular } = req.body;

  console.log(`Mi nombre es ${nombre}, mi apellido es ${apellido}, mi email es ${email} y el celular ${celular}`);

  const nuevoServicio = new Servicio({
    nombre,
    apellido,
    email,
    celular,
  });

  console.log(`Nuevo servicio a guardar: ${nuevoServicio}`);

  await nuevoServicio.save();

  res.json({
    mensaje: 'Servicio guardado exitosamente',
  });
});

/* Obtenemos toda la lista de clientes de contacto */
app.get('/contactos', async (req, res) => {
  const contactos = await Usuario.find({}, 'nombre email mensaje timestamp');

  console.log(contactos);

  res.json({
    contactos,
  });
});

/* Obtenemos toda la lista de clientes de servicio */
app.get('/servicios', async (req, res) => {
  const servicios = await Usuario.find({}, 'nombre apellido email celular timestamp');

  console.log(servicios);

  res.json({
    servicios,
  });
});

/* Eliminamos los datos del cliente por ID */
app.delete('/clientes/:id', async (req, res) => {
  const id = req.params.id;

  console.log(id);

  try {
    const deleteUser = await Usuario.findByIdAndDelete(id);
    console.log(deleteUser);
    if (deleteUser) {
      console.log('Cliente Eliminado');
      return res.status(200).send();
    } else {
      return res.status(404).send();
    }
  } catch (error) {
    console.log(error);
  }
});

/* Actualizamos los datos del cliente de contacto por ID */
app.put('/contactos/:id', async (req, res) => {
  const id = req.params.id;

  const data = {
    nombre: req.body.nombre,
    email: req.body.email,
    mensaje: req.body.mensaje,
  };

  console.log(data);
  console.log(id);

  try {
    const updateContacto = await Usuario.findByIdAndUpdate(id, data);
    console.log(updateContacto);
    if (updateContacto) {
      console.log('Cliente de contacto actualizado');
      return res.status(200).send();
    } else {
      return res.status(404).send();
    }
  } catch (error) {
    console.log(error);
  }
});

/* Actualizamos los datos del cliente de servicio por ID */
app.put('/servicios/:id', async (req, res) => {
  const id = req.params.id;

  const data = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    celular: req.body.celular,
  };

  console.log(data);
  console.log(id);

  try {
    const updateServicio = await Usuario.findByIdAndUpdate(id, data);
    console.log(updateServicio);
    if (updateServicio) {
      console.log('Cliente de servicio actualizado');
      return res.status(200).send();
    } else {
      return res.status(404).send();
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el Puerto ${PORT}`);
});