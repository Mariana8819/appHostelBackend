const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const roomsRoutes = require('./src/routes/rooms');
const cors = require('cors');

// Configurar dotenv para usar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error conectando a MongoDB:', error));

// Middleware para parsear JSON
app.use(express.json());
app.use(cors()); // Permitir CORS


// Usar las rutas
app.use('/api/rooms', roomsRoutes );

app.get('/', (req, res) => {
    res.send('API is running...');
  });

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
