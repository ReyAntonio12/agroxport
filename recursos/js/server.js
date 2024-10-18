const express = require('express');
const mysql = require('mysql2');
const app = express();


//Middleware para la base de datos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexion a la base de datos

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'AntonioRey121297*',
    database: 'agrolink_database'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);  //VERIFICANDO LA CONEXION
      return;
    }
    console.log('Conectado a la base de datos.');
  });


// Ruta para manejar la solicitud POST del formulario
app.post('/guardar-datos', (req, res) => {
    const { nom, tel, corr, ced, pw } = req.body;

 // Consulta SQL para insertar datos
 const sql = 'INSERT INTO socio (codigo_socio, nombre, direccion, telefono, email, cedula, nombre_de_empresa, ruc, codigo_minsa, contraseNa) VALUES (NULL, ?, NULL, ?, ?, ?, NULL, NULL, NULL, ?)';
 
 // Enviando datos de formulario a base de datos
 connection.query(sql, [nom, tel, corr, ced, pw ], (err, result) => {
   if (err) {
     console.error('Error al insertar datos:', err);
     return res.status(500).send('Error al guardar datos');
   }
   console.log('Datos insertados:', result);
   res.send('Datos guardados correctamente');
 });
});


// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
  });